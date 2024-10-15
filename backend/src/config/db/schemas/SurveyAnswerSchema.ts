import { Schema, model } from 'mongoose';

const AnswerSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }
}, { _id: false });

const SurveyAnswerSchema = new Schema({
  _id: { type: String, required: true, unique: true },
  surveyId: { type: String, required: true },
  email: { type: String, required: true },
  rate: { type: Number, required: true },
  answers: { type: [AnswerSchema], default: [] }
}, { _id: false, timestamps: true });

export default model('SurveyAnswer', SurveyAnswerSchema);
