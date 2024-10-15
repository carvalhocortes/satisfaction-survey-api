import * as Yup from 'yup';

export default Yup.object({
  body: Yup.object({
    target: Yup.string().required(),
    questions: Yup.array().of(Yup.string().required()).optional(),
  }).required(),
});
