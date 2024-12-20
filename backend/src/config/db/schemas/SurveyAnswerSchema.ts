import { Schema, model } from 'mongoose';

const AnswerSchema = new Schema({
  questionId: { type: String, required: true },
  answer: { type: String, required: true }
});

const SurveyAnswerSchema = new Schema({
  _id: { type: String, required: true, unique: true },
  surveyId: { type: String, required: true },
  audience: { type: String, required: true },
  email: { type: String, required: true },
  rate: { type: Number, required: true },
  answers: { type: [AnswerSchema], default: [] }
}, { timestamps: true });

export default model('SurveyAnswer', SurveyAnswerSchema);
