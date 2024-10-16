import { Parser } from 'json2csv';

import ISurveyRepository from '../interfaces/ISurveyRepository';
import EnumOrder from '../enums/EnumOrder';
import SurveyEntity from '../entities/SurveyEntity';
import SurveyAnswerEntity from '../entities/SurveyAnswerEntity';
import errorMessages from '../common/errorMessages';

export default class SurveyService {
  private surveyRepository: ISurveyRepository;

  constructor(surveyRepository: ISurveyRepository) {
    this.surveyRepository = surveyRepository;
  }

  create = ({ questions }: Partial<SurveyEntity>) => {
    return this.surveyRepository.createSurvey({ questions })
  }

  update = (id: string, { questions }: Partial<SurveyEntity>) => {
    return this.surveyRepository.updateSurvey(id, { questions })
  }

  answer = async (id: string, { email, audience, rate, answers }: Partial<SurveyAnswerEntity>) => {
    const survey = await this.surveyRepository.getSurvey(id);
    if (answers && survey.questions.length !== answers.length) throw errorMessages.invalidResponseLength
    return this.surveyRepository.answer(id, { email, audience, rate, answers });
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

}
