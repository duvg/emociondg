import { Request, Response } from 'express';
import { route, GET } from 'awilix-express';
import { CheckService } from '../services/check.service';

@route('/check')
export class CheckController {
  constructor(private readonly checkService: CheckService) {}

  @GET()
  public index(req: Request, res: Response): void {
    res.send({
      NODE_ENV: process.env.NODE_ENV,
      APP_ENV: process.env.APP_ENV,
    });
  }

  @route('/test')
  @GET()
  public test(req: Request, res: Response): void {
    res.send(this.checkService.get());
  }
}
