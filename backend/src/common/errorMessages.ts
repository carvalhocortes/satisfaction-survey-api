import { Error } from '../types/commonTypes'

export default {
  validationError: (errorsMessages: string[]): Error => ({
    httpCode: 400,
    msg: errorsMessages
  }),
  notRegistered: (subject: string): Error => ({
    httpCode: 404,
    msg: `A ${subject} não existe`
  }),
  invalidResponseLength: {
    httpCode: 400,
    msg: 'A quantidade de respostas deve ser igual a quantidade de perguntas'
  } as Error,
  exportFail: {
    httpCode: 500,
    msg: 'Erro ao exportar dados para CSV'
  } as Error,
  unAnswered: (id: string): Error => ({
    httpCode: 400,
    msg: `A pergunta de id ${id} não foi respondida`
  }),
  invalidResponseOption: (answer: string): Error => ({
    httpCode: 400,
    msg: `A resposta ${answer} não é válida para essa pergunta`
  }),
}

