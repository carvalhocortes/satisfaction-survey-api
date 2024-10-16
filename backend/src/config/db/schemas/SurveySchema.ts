import { Schema, model } from 'mongoose';

const SurveySchema = new Schema({
  _id: { type: String, required: true, unique: true },
  questions: { type: [String], default: [] }
}, { timestamps: true });

export default model('Survey', SurveySchema);
