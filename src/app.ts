import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import loadContainer from './container';
import { loadControllers } from 'awilix-express';
import { expressjwt } from 'express-jwt';

process.env.NODE_ENV = process.env.NODE_ENV ?? 'development';
process.env.APP_ENV = process.env.NODE_ENV ?? 'development';

dotenv.config({
  path: path.join(__dirname, `/../config/${process.env.APP_ENV}.env`),
});

const app: express.Application = express();

app.use(express.json());
loadContainer(app);

if (process.env.jwt_secret_key) {
  const expresmiddleware = expressjwt({
    secret: process.env.jwt_secret_key,
    algorithms: ['HS256'],
  }).unless({ path: ['/users/login'] });
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  app.use(expresmiddleware);
}

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === 'UnauthorizedError') {
    res.status(err.status).send({ message: err.message });
    return;
  }
  next();
});

app.use(loadControllers('controllers/*.ts', { cwd: __dirname }));

export { app };
