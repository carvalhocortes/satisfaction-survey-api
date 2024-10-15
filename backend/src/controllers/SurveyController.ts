import { Request } from 'express';
import SurveyService from '../services/SurveyService';
import EnumOrder from '../enums/EnumOrder';
import { Survey, SurveyAnswer } from '../types/surveyTypes';

export default class UserController {
  private surveyService: SurveyService;

  constructor(surveyService: SurveyService) {
    this.surveyService = surveyService;
  }

  create = (req: Request): Promise<Survey> => {
    const { target, questions } = req.body
    return this.surveyService.create({ target, questions })
  }

  update = (req: Request): Promise<Survey> => {
    const { id } = req.params
    const { target, questions } = req.body
    return this.surveyService.update(id, { target, questions })
  }

  answer = async (req: Request): Promise<SurveyAnswer> => {
    const { id } = req.params
    const { email, rate, answers } = req.body
    return this.surveyService.answer(id, { email, rate, answers });
  }

  listAnswers = (req: Request): Promise<SurveyAnswer[]> => {
    const { id } = req.params
    const sortStars = req.query?.sortStars as EnumOrder
    console.log({ id, sortStars })
    return this.surveyService.listAnswers(id, sortStars)
  }

}
