import SurveyAnswerEntity from '../entities/SurveyAnswerEntity';
import SurveyEntity from '../entities/SurveyEntity';
import EnumOrder from '../enums/EnumOrder';

export default interface ISurveyRepository {
  create({ target, questions }: Partial<SurveyEntity>): Promise<SurveyEntity>;
  update(id: string, { target, questions }: Partial<SurveyEntity>): Promise<SurveyEntity>;
  answer(id: string, { email, rate, answers }: Partial<SurveyAnswerEntity>): Promise<SurveyAnswerEntity>;
  listAnswers(id: string, sortStars?: EnumOrder): Promise<SurveyAnswerEntity[]>;
}
