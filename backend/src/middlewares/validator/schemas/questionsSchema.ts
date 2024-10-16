import * as Yup from 'yup';

import EnumQuestionsType from '../../../enums/EnumQuestionsType';

export default Yup.object().shape({
  id: Yup.string().optional(),
  question: Yup.string().required(),
  type: Yup.mixed().oneOf(Object.values(EnumQuestionsType)).required(),
  answersOptions: Yup.array().of(Yup.string())
    .when('type', ([type], schema) => type.startsWith("choose") ? schema.required() : schema.nullable())
});

