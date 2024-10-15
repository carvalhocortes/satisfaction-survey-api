import ISurveyRepository from '../interfaces/ISurveyRepository';
import EnumOrder from '../enums/EnumOrder';
import SurveyEntity from '../entities/SurveyEntity';
import SurveyAnswerEntity from '../entities/SurveyAnswerEntity';

export default class SurveyService {
  private surveyRepository: ISurveyRepository;

  constructor(surveyRepository: ISurveyRepository) {
    this.surveyRepository = surveyRepository;
  }

  create = ({ target, questions }: Partial<SurveyEntity>) => {
    return this.surveyRepository.create({ target, questions })
  }

  update = (id: string, { target, questions }: Partial<SurveyEntity>) => {
    return this.surveyRepository.update(id, { target, questions })
  }

  answer = async (id: string, { email, rate, answers }: Partial<SurveyAnswerEntity>) => {
    return this.surveyRepository.answer(id, { email, rate, answers });
  }

  listAnswers = (id: string, sortStars?: EnumOrder) => {
    return this.surveyRepository.listAnswers(id, sortStars)
  }


}
