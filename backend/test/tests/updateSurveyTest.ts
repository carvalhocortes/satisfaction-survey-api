import request from 'supertest'
import app from '../../src/app'
import should from 'should'

let _id: string

describe('Update Survey Testes', () => {
  before(async function () {
    const res = await request(app)
      .post('/survey')
      .send({ questions: ['question1'] })
      .expect(201)
    _id = res.body._id
  })
  it('Should update a survey', async function () {
    const { body } = await request(app)
      .patch(`/survey/${_id}`)
      .send({ questions: ['question3', 'question4'] })
      .expect(200)
    should(body).have.property('_id').and.be.String()
    should(body).have.property('questions').and.be.Array().and.have.length(2)
    should(body.questions[0]).be.equal('question3')
    should(body.questions[1]).be.equal('question4')
  })
})
