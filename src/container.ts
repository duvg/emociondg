import express from 'express';
import { scopePerRequest } from 'awilix-express';
import { createContainer, asClass } from 'awilix';

import { PgSqlPool } from './common/persistense/pgsql.persistence';
import { CheckService } from './services/check.service';

export default (app: express.Application): void => {
  const container = createContainer({
    injectionMode: 'CLASSIC',
  });

  container.register({
    // Repositories

    // Services
    checkService: asClass(CheckService).scoped(),

    pgSqlPool: asClass(PgSqlPool).scoped(),
  });

  app.use(scopePerRequest(container));
};
