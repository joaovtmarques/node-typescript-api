import express from 'express';
import { config } from 'dotenv';

config();

const app = express();

const port = process.env.PORT || 8000;

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`listening on port ${port}`));
