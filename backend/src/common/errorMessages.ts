import { Error } from '../types/commonTypes'

export default {
  validationError: (errorsMessages: string[]): Error => ({
    httpCode: 400,
    msg: errorsMessages
  }),
  alreadyExists: (field: string): Error => ({
    httpCode: 400,
    msg: `Este ${field} já está cadastrado`
  }),
  notRegistered: (subject: string): Error => ({
    httpCode: 404,
    msg: `O ${subject} não existe`
  })
}

