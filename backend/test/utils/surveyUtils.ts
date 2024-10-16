import app from '../../src/app'
import request from 'supertest'

import EnumQuestionsType from '../../src/enums/EnumQuestionsType'

export type CreateSurveyType = {
  surveyId: string;
  questionId: string;
}

export const createSurvey = async (): Promise<CreateSurveyType> => {
  const survey = await request(app)
    .post('/survey')
    .send({ questions: [assembleQuestion('Oi?')] })
    .expect(201)
  return {
    surveyId: survey.body._id,
    questionId: survey.body.questions[0]._id
  }
}

export const assembleQuestion = (question: string) => ({
  question,
  type: EnumQuestionsType.openQuestion
})

export const createAnswer = async (surveyId: string, questionId: string, audience: string, rate: number) =>
  request(app)
    .post(`/survey/${surveyId}`)
    .send({
      audience,
      email: 'teste@gmail.com',
      rate,
      answers: [{
        questionId,
        answer: 'answer'
      }],
    })
    .expect(201)
