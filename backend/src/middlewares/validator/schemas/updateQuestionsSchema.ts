import * as Yup from 'yup';

import EnumQuestionsType from '../../../enums/EnumQuestionsType';

export default Yup.object().shape({
  _id: Yup.string().optional(),
  question: Yup.string().optional(),
  type: Yup.mixed().oneOf(Object.values(EnumQuestionsType)).optional(),
  answersOptions: Yup.array().of(Yup.string())
    .when('type', ([type], schema) => type && type.startsWith("choose") ? schema.required() : schema.optional())
}).required();

