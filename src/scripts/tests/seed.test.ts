import { Database } from '@connection';

let usersGeneratorModule;
let actorsGeneratorModule;
let moviesGeneratorModule;

beforeEach(() => {
  jest.unmock('../../api/users/fixtures');
  usersGeneratorModule = require('../../api/users/fixtures');
  usersGeneratorModule.usersGenerator = jest.fn();

  jest.unmock('../../api/actors/fixtures');
  actorsGeneratorModule = require('../../api/actors/fixtures');
  actorsGeneratorModule.actorsGenerator = jest.fn();

  jest.unmock('../../api/movies/fixtures');
  moviesGeneratorModule = require('../../api/movies/fixtures');
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
