import { Database } from '@connection';

let usersGeneratorModule;
let actorsGeneratorModule;
let moviesGeneratorModule;

beforeEach(() => {
  jest.unmock('../../resources/users/fixtures');
  usersGeneratorModule = require('../../resources/users/fixtures');
  usersGeneratorModule.usersGenerator = jest.fn();

  jest.unmock('../../resources/actors/fixtures');
  actorsGeneratorModule = require('../../resources/actors/fixtures');
  actorsGeneratorModule.actorsGenerator = jest.fn();

  jest.unmock('../../resources/movies/fixtures');
  moviesGeneratorModule = require('../../resources/movies/fixtures');
  moviesGeneratorModule.moviesGenerator = jest.fn();
});

test('#seed seeds database with registered generators', done => {
  // when
  spyOn(Database, 'connect').and.callFake(() => Promise.resolve());
  spyOn(Database, 'drop').and.callFake(() => Promise.resolve());
  spyOn(Database, 'disconnect').and.callFake(() => Promise.resolve());

  require('../seed');

  // then
  process.nextTick(() => {
    expect(Database.connect).toHaveBeenCalled();
    expect(Database.drop).toHaveBeenCalled();
    expect(usersGeneratorModule.usersGenerator).toHaveBeenCalled();
    expect(actorsGeneratorModule.actorsGenerator).toHaveBeenCalled();
    expect(moviesGeneratorModule.moviesGenerator).toHaveBeenCalled();
    expect(Database.disconnect).toHaveBeenCalled();
    done();
  });
});