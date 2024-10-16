import { Schema, model } from 'mongoose';
import EnumQuestionsType from '../../../enums/EnumQuestionsType';

const QuestionSchema = new Schema({
  _id: { type: String, required: true, unique: true },
  question: { type: String, required: true },
  type: { type: String, required: true, enum: Object.values(EnumQuestionsType) },
  answersOptions: { type: [String], required: false, default: [] }
});

const SurveySchema = new Schema({
  _id: { type: String, required: true, unique: true },
  questions: { type: [QuestionSchema], required: true, default: [] }
}, { timestamps: true });

export default model('Survey', SurveySchema);
