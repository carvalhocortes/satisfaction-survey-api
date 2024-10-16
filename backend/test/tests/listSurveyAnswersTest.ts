import request from 'supertest'
import app from '../../src/app'
import should from 'should'

const audience = `audience_${Math.random() * 1000}`

describe('List Survey answers Testes', () => {
  before(async function () {
    const res = await request(app)
      .post('/survey')
      .send({ questions: ['question1'] })
      .expect(201)
    const _id = res.body._id
    await createAnswer(_id, 'teste1@teste.com', 2)
    await createAnswer(_id, 'teste2@teste.com', 5)
    await createAnswer(_id, 'teste2@teste.com', 3)
  })
  it('Should list a survey answers non ordered', async function () {
    const { body } = await request(app)
      .get(`/survey/${audience}`)
      .expect(200)
    should(body).be.Array().and.have.length(3)
  })
  it('Should list a survey answers ordered by asc', async function () {
    const { body } = await request(app)
      .get(`/survey/${audience}`)
      .query({ sortStars: 'ASC' })
      .expect(200)
    should(body).be.Array().and.have.length(3)
    should(body[0]).have.property('rate').be.equal(2)
    should(body[1]).have.property('rate').be.equal(3)
    should(body[2]).have.property('rate').be.equal(5)
  })
  it('Should list a survey answers ordered by desc', async function () {
    const { body } = await request(app)
      .get(`/survey/${audience}`)
      .query({ sortStars: 'DESC' })
      .expect(200)
    should(body).be.Array().and.have.length(3)
    should(body[0]).have.property('rate').be.equal(5)
    should(body[1]).have.property('rate').be.equal(3)
    should(body[2]).have.property('rate').be.equal(2)
  })
})

const createAnswer = async (id: string, email: string, rate: number) =>
  request(app)
    .post(`/survey/${id}`)
    .send({
      audience,
      email,
      rate,
      answers: [{
        questionId: '0',
        answer: 'answer1'
      }],
    })
    .expect(201)
