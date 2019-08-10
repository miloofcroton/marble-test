import { combineRoutes, EffectFactory } from '@marblejs/core';
import { versionEffect$, preflightEffect$, getFileEffect$, notFoundEffect$ } from '../util/effects';
import { auth$ } from './auth/api/routes';
import { users$ } from './users/api/routes';
import { actors$ } from './actors/api/routes';
import { movies$ } from './movies/api/routes';

const root$ = EffectFactory
  .matchPath('/')
  .matchType('GET')
  .use(versionEffect$);

const preflight$ = EffectFactory
  .matchPath('*')
  .matchType('OPTIONS')
  .use(preflightEffect$);

const getFile$ = EffectFactory
  .matchPath('/assets/:dir*')
  .matchType('GET')
  .use(getFileEffect$);

const notFound$ = EffectFactory
  .matchPath('*')
  .matchType('*')
  .use(notFoundEffect$);

export const routes$ = combineRoutes('/api/v1', [
  root$,
  auth$,
  users$,
  actors$,
  movies$,
  getFile$,
  preflight$,
  notFound$
]);
