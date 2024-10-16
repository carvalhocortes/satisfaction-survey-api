import request from 'supertest'
import app from '../../src/app'
import should from 'should'
import { assembleQuestion } from '../utils/surveyUtils'

describe('Create Survey Testes', () => {
  it('Should create a survey', async function () {
    const { body } = await request(app)
      .post('/survey')
      .send({ questions: [assembleQuestion('question1'), assembleQuestion('question2')] })
      .expect(201)
    should(body).have.property('_id').and.be.String()
    should(body).have.property('questions').and.be.Array().and.have.length(2)
  })
})

