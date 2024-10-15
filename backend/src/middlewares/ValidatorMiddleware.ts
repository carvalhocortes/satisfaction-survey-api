import { Request, Response, NextFunction } from 'express';
import * as Yup from 'yup';
import errorMessages from '../common/errorMessages';

export default class ValidationMiddleware {

  constructor(private schema: Yup.ObjectSchema<any>) { }

  validate = (req: Request, res: Response, next: NextFunction) => {
    this.schema
      .validate(req, { abortEarly: false })
      .then(() => {
        next();
      })
      .catch((err: Yup.ValidationError) => {
        const messages = err.inner.map(error => error.message);
        const error = errorMessages.validationError(messages);
        res.status(error.httpCode).json(error);
      });
  };
};
