import { Response } from 'express';
import { ApplicationException } from '../../common/exceptions/application.exceptions';

export abstract class BaseController {
  handleException(err: any, res: Response): Response {
    if (err instanceof ApplicationException) {
      res.status(400);
      return res.send({ error: err.message });
    } else {
      throw new Error(err);
    }
  }
}
