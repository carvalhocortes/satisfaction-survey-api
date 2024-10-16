import request from 'supertest'
import app from '../../src/app'
import should from 'should'

let _id: string

describe('Answer a Survey Testes', () => {
  before(async function () {
    const res = await request(app)
      .post('/survey')
      .send({ questions: ['question1'] })
      .expect(201)
    _id = res.body._id
  })
  it('Should answer a survey', async function () {
    const { body } = await request(app)
      .post(`/survey/${_id}`)
      .send({
        audience: 'audience',
        email: 'teste@teste.com',
        rate: 4,
        answers: [{
          questionId: '0',
          answer: 'answer1'
        }],
      })
      .expect(201)
    should(body).have.property('_id').and.be.String()
    should(body).have.property('audience').be.equal('audience')
    should(body).have.property('email').be.equal('teste@teste.com')
    should(body).have.property('rate').be.equal(4)
    should(body).have.property('answers').and.be.Array().and.have.length(1)
    should(body.answers[0]).have.property('questionId').be.equal('0')
    should(body.answers[0]).have.property('answer').be.equal('answer1')
  })
})
