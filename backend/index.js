import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import router from './router/index.js';
import errorMiddleware from './middlewares/error.js';

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());

app.use('/api', router);

app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);

    app.listen(PORT, () => {
      console.log('Server listening on ' + PORT);
    });
  } catch (err) {
    console.error(err);
  }
};

start();
