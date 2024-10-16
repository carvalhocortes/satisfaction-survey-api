import { v4 as uuidv4 } from 'uuid';

import SurveyModel from '../config/db/schemas/SurveySchema';
import SurveyEntity, { Questions } from '../entities/SurveyEntity';
import SurveyAnswerModel from '../config/db/schemas/SurveyAnswerSchema';
import SurveyAnswerEntity from '../entities/SurveyAnswerEntity';

import EnumOrder from '../enums/EnumOrder';
import ISurveyRepository from '../interfaces/ISurveyRepository';
import errorMessages from '../common/errorMessages';

export default class SurveyRepository implements ISurveyRepository {

  constructor() {
  }

  async getSurvey(_id: string): Promise<SurveyEntity> {
    const survey = await SurveyModel.findById(_id) as SurveyEntity;
    if (!survey) throw errorMessages.notRegistered('Pesquisa');
    return new SurveyEntity(survey._id, survey.questions);
  }

  async createSurvey(questions: Questions[]): Promise<SurveyEntity> {
    const _id = uuidv4()
    const newSurvey = new SurveyModel({ _id, questions });
    const savedSurvey = await newSurvey.save();
    return new SurveyEntity(savedSurvey._id, savedSurvey.questions as Questions[]);
  }

  async updateSurvey(_id: string, questions: Questions[]): Promise<SurveyEntity> {
    const updateData: Partial<SurveyEntity> = { ...(questions && { questions }) };
    const updatedSurvey = await SurveyModel.findByIdAndUpdate(
      _id,
      updateData,
      { new: true }
    ) as SurveyEntity;
    if (!updatedSurvey) throw errorMessages.notRegistered('Pesquisa')
    return new SurveyEntity(updatedSurvey._id, updatedSurvey.questions);
  }

  async answer(surveyId: string, surveyAnswer: SurveyAnswerEntity): Promise<SurveyAnswerEntity> {
    const _id = uuidv4()
    const { email, audience, rate, answers } = surveyAnswer;
    const newSurveyAnswer = new SurveyAnswerModel({ _id, audience, surveyId, email, rate, answers });
    const savedSurveyAnswer = await newSurveyAnswer.save();
    return new SurveyAnswerEntity(savedSurveyAnswer._id, savedSurveyAnswer.surveyId, savedSurveyAnswer.audience, savedSurveyAnswer.email, savedSurveyAnswer.rate, savedSurveyAnswer.answers);
  }

  listAnswers(audience: string, sortStars?: EnumOrder): Promise<SurveyAnswerEntity[]> {
    const query = SurveyAnswerModel.find({ audience });
    if (sortStars) query.sort({ rate: sortStars === EnumOrder.asc ? 1 : -1 });
    return query.exec();
  }

}


