export default class SurveyEntity {
  constructor(
    public _id: string,
    public target: string,
    public questions?: string[]
  ) { }
}
