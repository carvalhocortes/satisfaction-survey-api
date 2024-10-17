import request from 'supertest'
import app from '../../src/app'
import should from 'should'
import { assembleQuestion, createSurvey, CreateSurveyType } from '../utils/surveyUtils'

let survey: CreateSurveyType

describe('Update Survey Testes', () => {
  before(async function () {
    survey = await createSurvey()
  })
  it('Should update a survey', async function () {
    const { body } = await request(app)
      .patch(`/survey/${survey.surveyId}`)
      .send({ questions: [assembleQuestion('updated oi ?'), assembleQuestion('nova pergunta ?')] })
      .expect(200)
    should(body).have.property('_id').and.be.String()
    should(body).have.property('questions').and.be.Array().and.have.length(3)
    should(body.questions[0].question).be.equal('updated oi ?')
    should(body.questions[1].question).be.equal('nova pergunta ?')
  })
})
