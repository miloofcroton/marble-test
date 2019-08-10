import { httpListener } from '@marblejs/core';
import { bodyParser$ } from '@marblejs/middleware-body';
import { logger$, cors$ } from './middleware';
import { routes$ } from './resources';

const middlewares = [
  cors$,
  logger$,
  bodyParser$(),
];

const effects = [
  routes$,
];

export default httpListener({ middlewares, effects });
