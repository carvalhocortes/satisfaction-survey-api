import { Request, Response } from 'express';

export default (fn: Function, httpCode = 200) => {
  return async (req: Request, res: Response) => {
    try {
      const response = await fn(req, res);
      res.status(httpCode).send(response);
    } catch (error) {
      if (process.env.SHOW_LOGS === 'true') console.error(error)
      if (error.httpCode) {
        res.status(error.httpCode).send(error);
      }
      res.status(500).send({ message: 'Internal server error!' });
    }
  };
}
