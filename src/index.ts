import 'reflect-metadata';

import express from 'express';
import { config } from 'dotenv';
import swaggerUi from 'swagger-ui-express';

import { MongoClient } from './database/mongo';
import { user } from './routes/user';
import { RegisterRoutes } from './routes/routes';

import swaggerDoc from '../swagger.json';

const main = async () => {
  config();

  const app = express();

  app.use(express.json());

  app.use(user);

  RegisterRoutes(app);

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

  const port = process.env.PORT || 8000;

  await MongoClient.connect();

  // eslint-disable-next-line no-console
  app.listen(port, () => console.log(`listening on port ${port}`));
};

main();
