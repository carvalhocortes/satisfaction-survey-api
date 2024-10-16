import * as Yup from 'yup';

import EnumOrder from '../../../enums/EnumOrder';

export default Yup.object({
  params: Yup.object({
    audience: Yup.string().required(),
  }).required(),
  query: Yup.object({
    sortStars: Yup.string()
      .oneOf(Object.values(EnumOrder))
      .optional()
  }).required(),
});
