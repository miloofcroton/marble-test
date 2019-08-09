import * as path from 'path';
import { throwError, of, iif } from 'rxjs';
import { map, mergeMap, catchError, switchMap, mapTo } from 'rxjs/operators';
import { HttpEffect, HttpError, HttpStatus, use } from '@marblejs/core';
import { requestValidator$, t } from '@marblejs/middleware-io';
import * as FileHelper from '@marblejs/core/dist/+internal/files';

const STATIC_PATH = path.resolve(__dirname, '../../assets');

const validator$ = requestValidator$({
  params: t.type({
    dir: t.string,
  })
});

export const getFileEffect$: HttpEffect = req$ =>
  req$.pipe(
    use(validator$),
    mergeMap(req => of(req.params.dir).pipe(
      mergeMap(FileHelper.readFile(STATIC_PATH)),
      map(body => ({ body })),
      catchError(error => iif(
        () => error.code === 'ENOENT',
        throwError(new HttpError(`Asset not found for path: ${req.url}`, HttpStatus.NOT_FOUND)),
        throwError(new HttpError('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR)),
      )),
    )),
  );


export const notFoundEffect$: HttpEffect = req$ =>
  req$.pipe(switchMap(() =>
    throwError(new HttpError('Route not found', HttpStatus.NOT_FOUND))
  ));

export const preflightEffect$: HttpEffect = req$ =>
  req$.pipe(
    mapTo({ status: HttpStatus.OK }),
  );

export const versionEffect$: HttpEffect = req$ =>
  req$.pipe(
    mapTo({ body: `API version: v1` }),
  );
