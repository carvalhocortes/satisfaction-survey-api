import { Request } from 'express';
import SurveyService from '../services/SurveyService';
import EnumOrder from '../enums/EnumOrder';
import SurveyEntity from '../entities/SurveyEntity';
import SurveyAnswerEntity from '../entities/SurveyAnswerEntity';

export default class UserController {
  private surveyService: SurveyService;

  constructor(surveyService: SurveyService) {
    this.surveyService = surveyService;
  }

  create = (req: Request): Promise<SurveyEntity> => {
    const { target, questions } = req.body
    return this.surveyService.create({ target, questions })
  }

  update = (req: Request): Promise<SurveyEntity> => {
    const { id } = req.params
    const { target, questions } = req.body
    return this.surveyService.update(id, { target, questions })
  }

  answer = async (req: Request): Promise<SurveyAnswerEntity> => {
    const { id } = req.params
    const { email, rate, answers } = req.body as Partial<SurveyAnswerEntity>
    return this.surveyService.answer(id, { email, rate, answers });
  }

  listAnswers = (req: Request): Promise<SurveyAnswerEntity[]> => {
    const { id } = req.params
    const sortStars = req.query?.sortStars as EnumOrder
    return this.surveyService.listAnswers(id, sortStars)
  }

}
