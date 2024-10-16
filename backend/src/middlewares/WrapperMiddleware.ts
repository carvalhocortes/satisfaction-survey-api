import { Request, Response } from 'express';

export default (fn: Function, httpCode = 200) => {
  return async (req: Request, res: Response) => {
    try {
      const response = await fn(req, res);
      res.status(httpCode).send(response);
    } catch (error) {
      if (process.env.SHOW_LOGS === 'true') console.error(error)
      if (error.httpCode) return res.status(error.httpCode).send(error);
      return res.status(500).send({ msg: 'Internal server error!' });
    }
  };
}
