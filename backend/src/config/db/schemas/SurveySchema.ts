import { Schema, model } from 'mongoose';

const SurveySchema = new Schema({
  _id: { type: String, required: true, unique: true },
  target: { type: String, required: true },
  questions: { type: [String], default: [] }
}, { _id: false, timestamps: true });

export default model('Survey', SurveySchema);
