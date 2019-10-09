import express from 'express';
import * as bodyparser from 'body-parser';
import { requestLoggerMiddleware } from './logger.middleware';
import { weatherRoutes } from './api/weather.controller';

const app = express();

app.use(bodyparser.json());
app.use(requestLoggerMiddleware);
app.use(weatherRoutes);

export { app }