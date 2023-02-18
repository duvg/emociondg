import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import loadContainer from './container';
import { loadControllers } from 'awilix-express';

process.env.NODE_ENV = process.env.NODE_ENV ?? 'development';
process.env.APP_ENV = process.env.NODE_ENV ?? 'development';

dotenv.config({
  path: path.join(__dirname, `/../config/${process.env.APP_ENV}.env`),
});

const app: express.Application = express();

app.use(express.json());

loadContainer(app);

app.use(loadControllers('controllers/*.ts', { cwd: __dirname }));

export { app };
