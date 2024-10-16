import SurveyAnswerEntity from '../entities/SurveyAnswerEntity';
import SurveyEntity from '../entities/SurveyEntity';
import EnumOrder from '../enums/EnumOrder';

export default interface ISurveyRepository {
  getSurvey(id: string): Promise<SurveyEntity>;
  createSurvey({ questions }: Partial<SurveyEntity>): Promise<SurveyEntity>;
  updateSurvey(id: string, { questions }: Partial<SurveyEntity>): Promise<SurveyEntity>;
  answer(id: string, { email, rate, answers }: Partial<SurveyAnswerEntity>): Promise<SurveyAnswerEntity>;
  listAnswers(audience: string, sortStars?: EnumOrder): Promise<SurveyAnswerEntity[]>;
}
