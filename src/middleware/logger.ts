import { logger$ as log$ } from '@marblejs/middleware-logger';
import { isTestEnv } from '../util/env';

export const logger$ = log$({ silent: isTestEnv() });
