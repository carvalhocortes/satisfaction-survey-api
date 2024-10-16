import * as Yup from 'yup';
import questionsSchema from './questionsSchema';

export default Yup.object({
  params: Yup.object({
    id: Yup.string().uuid().required(),
  }).required(),
  body: Yup.object({
    questions: Yup.array().of(questionsSchema.required()).optional(),
  }).required(),
});
