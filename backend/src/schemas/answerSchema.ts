import * as Yup from 'yup';

export default Yup.object({
  question: Yup.string().required(),
  answer: Yup.string().required()
});
