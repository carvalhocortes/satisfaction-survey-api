import * as express from 'express';

import createSurveySchema from '../middlewares/validator/schemas/createSurveySchema';
import updateSurveySchema from '../middlewares/validator/schemas/updateSurveySchema';
import answerSurveySchema from '../middlewares/validator/schemas/answerSurveySchema';
import listAnswersSchema from '../middlewares/validator/schemas/listAnswersSchema';

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
const { create, update, answer, listAnswers, exportListAnswers } = new SurveyController(surveyService);

router.post('/', validateCreate, wrapperFn(create, 201));
router.patch('/:id', validateUpdate, wrapperFn(update));
router.post('/:id', validateAnswer, wrapperFn(answer, 201));
router.get('/:audience', validateListAnswers, wrapperFn(listAnswers));
router.get('/:audience/export', validateListAnswers, exportListAnswers);

export default router;
