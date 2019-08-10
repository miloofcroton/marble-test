import { HttpRequest } from '@marblejs/core';
import { InstanceType } from 'typegoose';
import { getHostname } from '../../util/http';
import { CollectionQueryResult } from '../../util/helpers';
import { Movie } from './models';

export const applyHostname = (req: HttpRequest) => (movie: InstanceType<Movie>): Movie => ({
  ...movie.toJSON(),
  posterUrl: getHostname(req) + '/api/v1/assets' + movie.posterUrl,
});

export const applyHostnameForCollection = (req: HttpRequest) => (result: CollectionQueryResult<any>) => ({
  ...result,
  collection: result.collection.map(applyHostname(req)),
});
