import * as Yup from 'yup';

export default Yup.object({
  questionId: Yup.string().required(),
  answer: Yup.string().required()
});
