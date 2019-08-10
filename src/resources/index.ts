import { combineRoutes, EffectFactory } from '@marblejs/core';
import { versionEffect$, preflightEffect$, getFileEffect$, notFoundEffect$ } from '../util/effects';
import { auth$ } from './auth/api';
import { users$ } from './users/api';
import { actors$ } from './actors/api';
import { movies$ } from './movies/api';

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

export const api$ = combineRoutes('/api/v1', [
  root$,
  auth$,
  users$,
  actors$,
  movies$,
  getFile$,
  preflight$,
  notFound$
]);
