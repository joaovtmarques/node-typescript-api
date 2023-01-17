import express from 'express';
import { config } from 'dotenv';
import { MongoClient } from './database/mongo';

const main = async () => {
  config();

  const app = express();

  const port = process.env.PORT || 8000;

  await MongoClient.connect();

  // eslint-disable-next-line no-console
  app.listen(port, () => console.log(`listening on port ${port}`));
};

main();
