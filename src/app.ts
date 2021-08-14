import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
require('dotenv').config();

import { PORT, mongoUri } from './config/config';
import requestLoggerMiddleware from './request.logger.middleware';
import categoryRouter from './routes/category.routes';
import cardRouter from './routes/card.routes';
import authRouter from './routes/auth.routers';
import clearDBCollections from './utils/clearDB';
import upLoadInitDBData from './utils/upload.init.data';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('static'));
app.use(requestLoggerMiddleware);
app.use('/api', categoryRouter);
app.use('/api', cardRouter);
app.use('/auth', authRouter);
mongoose.set('useFindAndModify', false);

const start = async () => {
  try {
    await mongoose.connect( mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    await clearDBCollections();
    upLoadInitDBData();
    app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));
  } catch (err) {
    console.log('Server error: ', err.message);
    process.exit(1);
  }
};
start();