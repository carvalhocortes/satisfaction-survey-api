import * as Yup from 'yup';

export default Yup.object({
  params: Yup.object({
    id: Yup.string().uuid().required(),
  }).required(),
  body: Yup.object({
    questions: Yup.array().of(Yup.string().required()).optional(),
  }).required(),
});
