import * as request from 'supertest';
import { throwError } from 'rxjs';
import { createContext } from '@marblejs/core';
import * as FileHelper from '@marblejs/core/dist/+internal/files';
import httpListener from '@app';

describe('getFileEffect$', () => {
  const app = httpListener.run(createContext());

  test('GET api/v1/assets/:dir responds with 200 for actors entity', async () =>
    request(app)
      .get('/api/v1/assets/img/actors/placeholder.jpg')
      .expect(200));

  test('GET api/v1/assets/:dir responds with 200 for movies entity', async () =>
    request(app)
      .get('/api/v1/assets/img/movies/placeholder.jpg')
      .expect(200));

  test('GET api/v1/assets/:dir responds with 404 if file is not found', async () =>
    request(app)
      .get('/api/v1/assets/img/not_found.jpg')
      .expect(404, { error: {
        status: 404,
        message: 'Asset not found for path: /api/v1/assets/img/not_found.jpg'
      }}));

  test('GET api/v1/assets/:dir responds with 500 if file reader throws an error', async () => {
    jest.spyOn(FileHelper, 'readFile')
      .mockImplementation(() => throwError(new Error()));

    return request(app)
      .get('/api/v1/assets/img/errored.jpg')
      .expect(500, { error: {
        status: 500,
        message: 'Internal server error'
      }});
  });
});

describe('notFoundEffect$', () => {
  const app = httpListener.run(createContext());

  test('GET api/v1/undefined responds with 400', async () =>
    request(app)
      .get('/api/v1/undefined')
      .expect(404, { error: { status: 404, message: 'Route not found' } }));
});


describe('preflightEffect$', () => {
  const app = httpListener.run(createContext());

  test('GET /api/v1 responds with 200', async () =>
    request(app)
      .options('/api/v1')
      .expect(200));
});

describe('versionEffect$', () => {
  const app = httpListener.run(createContext());

  test('GET api/v1 responds with 200', async () =>
    request(app)
      .get('/api/v1')
      .expect(200, '"API version: v1"'));
});
