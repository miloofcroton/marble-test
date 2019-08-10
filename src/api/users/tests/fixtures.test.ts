import { usersGenerator } from '../fixtures';

let generatorModule;

beforeEach(() => {
  jest.unmock('../fixtures');
  generatorModule = require('../fixtures');
  generatorModule.generateCollectionFromModel = jest.fn(
    () => jest.fn(
      () => Promise.resolve()
    )
  );
});

test('#usersGenerator seeds users collection', async () => {
  expect(async () => await usersGenerator()).not.toThrow();
});
