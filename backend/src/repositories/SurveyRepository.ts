
import EnumOrder from '../enums/EnumOrder';
import ISurveyRepository from '../interfaces/ISurveyRepository';
import { Survey, SurveyAnswer } from '../types/surveyTypes';

const faltaImplementarSurvey: Survey = {
  id: 'Falta implementar',
  target: 'Falta implementar',
  questions: ['Falta implementar']
}

const faltaImplementarSurveyAnswer: SurveyAnswer = {
  email: 'Falta implementar',
  rate: 0,
  answers: [{
    question: 'Falta implementar',
    answer: 'Falta implementar'
  }]
}

export default class SurveyRepository implements ISurveyRepository {
  constructor() {
  }
  create(_s: Partial<Survey>): Promise<Survey> {
    // create({ target, questions }: Partial<Survey>): Promise<Survey> {
    return Promise.resolve(faltaImplementarSurvey);
  }
  update(_id: string, _s: Partial<Survey>): Promise<Survey> {
    // update(id: string, { target, questions }: Partial<Survey>): Promise<Survey> {
    return Promise.resolve(faltaImplementarSurvey);
  }
  answer(_id: string, _s: SurveyAnswer): Promise<SurveyAnswer> {
    // answer(id: string, { email, rate, answers }: SurveyAnswer): Promise<SurveyAnswer> {
    return Promise.resolve(faltaImplementarSurveyAnswer);
  }
  listAnswers(_id: string, _sortStars?: EnumOrder): Promise<SurveyAnswer[]> {
    return Promise.resolve([faltaImplementarSurveyAnswer]);
  }

}
