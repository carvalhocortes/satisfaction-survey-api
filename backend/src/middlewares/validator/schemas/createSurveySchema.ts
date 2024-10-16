import * as Yup from 'yup';
import questionsSchema from './questionsSchema';

export default Yup.object({
  body: Yup.object({
    questions: Yup.array().of(questionsSchema.required()).required(),
  }).required(),
});
