import request from 'supertest'
import app from '../../src/app'
import should from 'should'
import { createAnswer, createSurvey } from '../utils/surveyUtils'

const audience = `audience_${Math.random() * 1000}`

describe('List Survey answers Testes', () => {
  before(async function () {
    const survey = await createSurvey()
    await createAnswer(survey.surveyId, survey.questionId, audience, 2)
    await createAnswer(survey.surveyId, survey.questionId, audience, 5)
    await createAnswer(survey.surveyId, survey.questionId, audience, 3)
    await createAnswer(survey.surveyId, survey.questionId, audience, 1)
    await createAnswer(survey.surveyId, survey.questionId, audience, 4)
  })
  it('Should list a survey answers non ordered', async function () {
    const { body } = await request(app)
      .get(`/survey/${audience}`)
      .expect(200)
    should(body).be.Array().and.have.length(5)
  })
  it('Should list a survey answers ordered by asc', async function () {
    const { body } = await request(app)
      .get(`/survey/${audience}`)
      .query({ sortStars: 'ASC' })
      .expect(200)
    should(body).be.Array().and.have.length(5)
    should(body[0]).have.property('rate').be.equal(1)
    should(body[1]).have.property('rate').be.equal(2)
    should(body[2]).have.property('rate').be.equal(3)
    should(body[3]).have.property('rate').be.equal(4)
    should(body[4]).have.property('rate').be.equal(5)
  })
  it('Should list a survey answers ordered by desc', async function () {
    const { body } = await request(app)
      .get(`/survey/${audience}`)
      .query({ sortStars: 'DESC' })
      .expect(200)
    should(body).be.Array().and.have.length(5)
    should(body[0]).have.property('rate').be.equal(5)
    should(body[1]).have.property('rate').be.equal(4)
    should(body[2]).have.property('rate').be.equal(3)
    should(body[3]).have.property('rate').be.equal(2)
    should(body[4]).have.property('rate').be.equal(1)
  })
})


