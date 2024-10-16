import EnumQuestionsType from '../enums/EnumQuestionsType';

export interface Questions {
  _id: string
  question: string;
  type: EnumQuestionsType;
  answersOptions?: string[];
}

export default class SurveyEntity {
  constructor(
    public _id: string,
    public questions: Questions[]
  ) { }
}
