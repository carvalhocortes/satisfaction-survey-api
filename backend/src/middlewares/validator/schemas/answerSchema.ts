import * as Yup from 'yup';

export default Yup.object({
  questionId: Yup.number().required(),
  answer: Yup.string().required()
});
