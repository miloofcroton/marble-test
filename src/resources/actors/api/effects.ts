import { HttpError, HttpStatus, HttpEffect, use } from '@marblejs/core';
import { requestValidator$, t } from '@marblejs/middleware-io';
import { throwError, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { neverNullable } from '../../../util/etc/rxjs';
import { collectionQueryValidator$ } from '../../../util/database/validators';
import { applyHostname, applyHostnameForCollection } from './helpers';
import { ActorsMethods, SORTING_FIELDS } from './methods';

const validator$ = requestValidator$({
  params: t.type({
    id: t.string,
  })
});

export const getActorEffect$: HttpEffect = req$ =>
  req$.pipe(
    use(validator$),
    mergeMap(req => of(req.params.id).pipe(
      mergeMap(ActorsMethods.findOneByImdbID),
      mergeMap(neverNullable),
      map(applyHostname(req)),
      map(actor => ({ body: actor })),
      catchError(() => throwError(
        new HttpError('Actor does not exist', HttpStatus.NOT_FOUND)
      ))
    ))
  );

export const getActorListEffect$: HttpEffect = req$ =>
  req$.pipe(
    use(collectionQueryValidator$({ sortBy: SORTING_FIELDS })),
    mergeMap(req => of(req).pipe(
      map(req => req.query),
      mergeMap(ActorsMethods.findAll),
      map(applyHostnameForCollection(req)),
      map(actors => ({ body: actors })),
    ))
  );
