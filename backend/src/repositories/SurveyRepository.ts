import { v4 as uuidv4 } from 'uuid';

import SurveyModel from '../config/db/schemas/SurveySchema';
import SurveyEntity from '../entities/SurveyEntity';
import SurveyAnswerModel from '../config/db/schemas/SurveyAnswerSchema';
import SurveyAnswerEntity from '../entities/SurveyAnswerEntity';

import EnumOrder from '../enums/EnumOrder';
import ISurveyRepository from '../interfaces/ISurveyRepository';
import errorMessages from '../common/errorMessages';

export default class SurveyRepository implements ISurveyRepository {
  constructor() {
  }
  async create({ target, questions }: Partial<SurveyEntity>) {
    const _id = uuidv4()
    const newSurvey = new SurveyModel({ _id, target, questions });
    const savedSurvey = await newSurvey.save();
    return new SurveyEntity(savedSurvey.id, savedSurvey.target, savedSurvey.questions);
  }

  async update(_id: string, { target, questions }: Partial<SurveyEntity>): Promise<SurveyEntity> {
    const updateData: Partial<SurveyEntity> = {
      ...(target && { target }),
      ...(questions && { questions })
    };
    const updatedSurvey = await SurveyModel.findByIdAndUpdate(
      _id,
      updateData,
      { new: true }
    );
    if (!updatedSurvey) throw errorMessages.notRegistered('Pesquisa')
    return new SurveyEntity(updatedSurvey.id, updatedSurvey.target, updatedSurvey.questions);
  }

  async answer(surveyId: string, surveyAnswer: SurveyAnswerEntity): Promise<SurveyAnswerEntity> {
    const _id = uuidv4()
    const { email, rate, answers } = surveyAnswer;
    const newSurveyAnswer = new SurveyAnswerModel({ _id, surveyId, email, rate, answers });
    const savedSurveyAnswer = await newSurveyAnswer.save();
    return new SurveyAnswerEntity(savedSurveyAnswer._id, savedSurveyAnswer.surveyId, savedSurveyAnswer.email, savedSurveyAnswer.rate, savedSurveyAnswer.answers);
  }

  listAnswers(surveyId: string, sortStars?: EnumOrder): Promise<SurveyAnswerEntity[]> {
    const query = SurveyAnswerModel.find({ surveyId });
    if (sortStars) query.sort({ rate: sortStars === EnumOrder.asc ? 1 : -1 });
    return query.exec();
  }

}


