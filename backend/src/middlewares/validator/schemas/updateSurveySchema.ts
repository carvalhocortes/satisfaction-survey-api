import * as Yup from 'yup';
import questionsSchema from './updateQuestionsSchema';

export default Yup.object({
  params: Yup.object({
    id: Yup.string().required(),
  }).required(),
  body: Yup.object({
    questions: Yup.array().of(questionsSchema.required()).optional(),
  }).required()
});
