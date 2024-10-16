import { v4 as uuidv4 } from 'uuid';
import { Parser } from 'json2csv';

import ISurveyRepository from '../interfaces/ISurveyRepository';
import EnumOrder from '../enums/EnumOrder';
import { Questions } from '../entities/SurveyEntity';
import SurveyAnswerEntity, { Answer } from '../entities/SurveyAnswerEntity';
import errorMessages from '../common/errorMessages';
import EnumQuestionsType from '../enums/EnumQuestionsType';

export default class SurveyService {
  private surveyRepository: ISurveyRepository;

  constructor(surveyRepository: ISurveyRepository) {
    this.surveyRepository = surveyRepository;
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
    return this.surveyRepository.answer(surveyId, { email, audience, rate, answers });
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
    return updateQuestions.map(updateQuestion => {
      const savedQuestion = savedQuestions.find(question => question._id === updateQuestion._id);
      return savedQuestion ?
        { ...savedQuestion, ...updateQuestion } :
        { ...updateQuestion, _id: uuidv4() }
    })
  }
}
