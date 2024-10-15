import EnumOrder from '../enums/EnumOrder';
import { Survey, SurveyAnswer } from '../types/surveyTypes'

export default interface ISurveyRepository {
  create({ target, questions }: Partial<Survey>): Promise<Survey>;
  update(id: string, { target, questions }: Partial<Survey>): Promise<Survey>;
  answer(id: string, { email, rate, answers }: SurveyAnswer): Promise<SurveyAnswer>;
  listAnswers(id: string, sortStars?: EnumOrder): Promise<SurveyAnswer[]>;
}
