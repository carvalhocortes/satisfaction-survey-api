export interface Answer {
  questionId: string;
  answer: string;
}

export default class SurveyAnswerEntity {
  constructor(
    public _id: string,
    public surveyId: string,
    public audience: string,
    public email: string,
    public rate: number,
    public answers?: Answer[]
  ) { }
}
