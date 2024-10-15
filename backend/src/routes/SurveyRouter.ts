import * as express from 'express';

import createSurveySchema from '../schemas/createSurveySchema';
import updateSurveySchema from '../schemas/updateSurveySchema';
import answerSurveySchema from '../schemas/answerSurveySchema';
import listAnswersSchema from '../schemas/listAnswersSchema';

import SurveyRepository from '../repositories/SurveyRepository';
import SurveyService from '../services/SurveyService';
import SurveyController from '../controllers/SurveyController';

import wrapperFn from '../middlewares/WrapperMiddleware';
import ValidationMiddleware from '../middlewares/ValidatorMiddleware';

const router = express.Router();

const { validate: validateCreate } = new ValidationMiddleware(createSurveySchema);
const { validate: validateUpdate } = new ValidationMiddleware(updateSurveySchema);
const { validate: validateAnswer } = new ValidationMiddleware(answerSurveySchema);
const { validate: validateListAnswers } = new ValidationMiddleware(listAnswersSchema);

const surveyRepository = new SurveyRepository();
const surveyService = new SurveyService(surveyRepository);
const { create, answer, listAnswers, update } = new SurveyController(surveyService);

router.post('/', validateCreate, wrapperFn(create, 201));
router.post('/:id/answer', validateAnswer, wrapperFn(answer, 200));
router.get('/:id/answer', validateListAnswers, wrapperFn(listAnswers));
router.patch('/:id', validateUpdate, wrapperFn(update));

export default router;
