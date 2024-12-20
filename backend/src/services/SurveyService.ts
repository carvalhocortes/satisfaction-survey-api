import { v4 as uuidv4 } from 'uuid';
import { Parser } from 'json2csv';

import ISurveyRepository from '../interfaces/ISurveyRepository';
import INotificationService from '../interfaces/INotificationService'
import EnumOrder from '../enums/EnumOrder';
import { Questions } from '../entities/SurveyEntity';
import SurveyAnswerEntity, { Answer } from '../entities/SurveyAnswerEntity';
import errorMessages from '../common/errorMessages';
import EnumQuestionsType from '../enums/EnumQuestionsType';
import NotificationService from './notificationEmail';

export default class SurveyService {
  private surveyRepository: ISurveyRepository;
  private notification: INotificationService

  constructor(surveyRepository: ISurveyRepository) {
    this.surveyRepository = surveyRepository;
    this.notification = new NotificationService();
  }

  create = (questions: Questions[]) => {
    const assembledQuestions = this.assembleQuestions(questions);
    return this.surveyRepository.createSurvey(assembledQuestions)
  }

  update = async (surveyId: string, newQuestions: Questions[]) => {
    const assembledQuestions = await this.assembleUpdateQuestions(surveyId, newQuestions);
    return this.surveyRepository.updateSurvey(surveyId, assembledQuestions)
  }

  answer = async (surveyId: string, { email, audience, rate, answers }: Partial<SurveyAnswerEntity>) => {
    await this.validateAnswers(surveyId, answers);
    const answer = await this.surveyRepository.answer(surveyId, { email, audience, rate, answers });
    await this.notification.sendObrigadoEmail(answer.email)
    return answer;
  }

  listAnswers = (audience: string, sortStars?: EnumOrder) => {
    return this.surveyRepository.listAnswers(audience, sortStars)
  }

  exportListAnswers = async (audience: string): Promise<string> => {
    const answersByAudience = await this.surveyRepository.listAnswers(audience);
    const fields = ['_id', 'surveyId', 'audience', 'rate', 'email', 'answers', 'createdAt'];
    const json2csvParser = new Parser({ fields });
    return json2csvParser.parse(answersByAudience);
  }

  private validateAnswers = async (surveyId: string, answers?: Answer[]) => {
    const { questions } = await this.surveyRepository.getSurvey(surveyId);
    if ((answers && questions.length !== answers.length) || !answers) throw errorMessages.invalidResponseLength
    questions.forEach(question => {
      const selectedAnswer = answers.find(answer => answer.questionId === question._id);
      if (!selectedAnswer) throw errorMessages.unAnswered(question._id)
      if (question.type !== EnumQuestionsType.openQuestion && !question.answersOptions!.includes(selectedAnswer.answer)) throw errorMessages.invalidResponseOption(selectedAnswer.answer)
    });
  }

  private assembleQuestions(questions: Questions[]): Questions[] {
    return questions.map(question => ({
      ...question,
      _id: uuidv4()
    }));
  }

  private async assembleUpdateQuestions(surveyId: string, updateQuestions: Questions[]): Promise<Questions[]> {
    const { questions: savedQuestions } = await this.surveyRepository.getSurvey(surveyId);
    const updatedQuestions = updateQuestions.map((questionToUpdate) => {
      const savedQuestion = savedQuestions.find(question => question._id === questionToUpdate._id);
      return savedQuestion ?
        this.assembleUpdateQuestion(savedQuestion, questionToUpdate) :
        { ...questionToUpdate, _id: uuidv4() }
    })
    const dontUpdatedQuestions = savedQuestions.filter(savedQuestion => !updatedQuestions.some(question => question._id === savedQuestion._id));
    return [...updatedQuestions, ...dontUpdatedQuestions];
  }

  private assembleUpdateQuestion(savedQuestion: Questions, updateQuestion: Questions): Questions {
    return {
      _id: savedQuestion._id,
      question: updateQuestion.question || savedQuestion.question,
      type: updateQuestion.type || savedQuestion.type,
      answersOptions: updateQuestion.type !== EnumQuestionsType.openQuestion ? updateQuestion.answersOptions || savedQuestion.answersOptions : undefined
    }
  }
}
