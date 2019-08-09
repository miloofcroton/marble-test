import { httpListener } from '@marblejs/core';
import { bodyParser$ } from '@marblejs/middleware-body';
import { logger$, cors$ } from './middleware';
import { api$ } from './api';

const middlewares = [
  cors$,
  logger$,
  bodyParser$(),
];

const effects = [
  api$,
];

export default httpListener({ middlewares, effects });
