import * as express from 'express';
import surveyRouter from './SurveyRouter';

const router = (app: express.Router) => {
  app.use('/survey', surveyRouter);
};

export default router;
