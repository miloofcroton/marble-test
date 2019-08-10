import { logger$ as log$ } from '@marblejs/middleware-logger';
import { isTestEnv } from '../util/envHelpers';

export const logger$ = log$({ silent: isTestEnv() });
