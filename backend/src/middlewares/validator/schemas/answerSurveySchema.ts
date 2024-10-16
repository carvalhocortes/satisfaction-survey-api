import * as Yup from 'yup';

import answerSchema from '../schemas/answerSchema';

export default Yup.object({
  params: Yup.object({
    id: Yup.string().uuid().required(),
  }).required(),
  body: Yup.object({
    email: Yup.string().email().required(),
    audience: Yup.string().required(),
    rate: Yup.number().min(1).max(5).required(),
    answers: Yup.array().of(answerSchema).optional(),
  }).required(),
});
