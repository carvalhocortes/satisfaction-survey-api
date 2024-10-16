import { Request, Response } from 'express';
import SurveyService from '../services/SurveyService';
import EnumOrder from '../enums/EnumOrder';
import SurveyEntity from '../entities/SurveyEntity';
import SurveyAnswerEntity from '../entities/SurveyAnswerEntity';
import errorMessages from '../common/errorMessages';

export default class UserController {
  private surveyService: SurveyService;

  constructor(surveyService: SurveyService) {
    this.surveyService = surveyService;
  }

  create = (req: Request): Promise<SurveyEntity> => {
    const { questions } = req.body
    return this.surveyService.create({ questions })
  }

  update = (req: Request): Promise<SurveyEntity> => {
    const { id } = req.params
    const { questions } = req.body
    return this.surveyService.update(id, { questions })
  }

  answer = async (req: Request): Promise<SurveyAnswerEntity> => {
    const { id } = req.params
    const { email, audience, rate, answers } = req.body as Partial<SurveyAnswerEntity>
    return this.surveyService.answer(id, { email, audience, rate, answers });
  }

  listAnswers = (req: Request): Promise<SurveyAnswerEntity[]> => {
    const { audience } = req.params
    const sortStars = req.query?.sortStars as EnumOrder
    return this.surveyService.listAnswers(audience, sortStars)
  }

  exportListAnswers = async (req: Request, res: Response): Promise<void> => {
    const { audience } = req.params
    try {
      const csv = await this.surveyService.exportListAnswers(audience)
      res.header('Content-Type', 'text/csv');
      res.header(`Content-Disposition', 'attachment; filename="surveys-${audience}.csv"`);
      res.status(200).send(csv);
    } catch (error) {
      console.error(errorMessages.exportFail.msg, error);
      res.status(errorMessages.exportFail.httpCode).send(errorMessages.exportFail.msg);
    }
  }
}
