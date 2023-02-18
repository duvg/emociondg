import express from 'express';
import { scopePerRequest } from 'awilix-express';
import { createContainer, asClass } from 'awilix';

import { PgSqlPool } from './common/persistense/pgsql.persistence';
import { CheckService } from './services/check.service';
import { EmotionService } from './services/emotion.service';
import { UserService } from './services/user.service';

import { EmotionPgSqlRepository } from './services/repositories/implementation/pgsql/emotion.repository';
import { UserPgSqlRepository } from './services/repositories/implementation/pgsql/user.repository';

export default (app: express.Application): void => {
  const container = createContainer({
    injectionMode: 'CLASSIC',
  });

  container.register({
    // Repositories
    emotionRepository: asClass(EmotionPgSqlRepository),
    userRepository: asClass(UserPgSqlRepository),

    // Services
    checkService: asClass(CheckService).scoped(),
    emotionService: asClass(EmotionService).scoped(),
    userService: asClass(UserService).scoped(),

    pgSqlPool: asClass(PgSqlPool).scoped(),
  });

  app.use(scopePerRequest(container));
};
