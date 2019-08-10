import { Database } from '@connection';
import { usersGenerator } from '../resources/users/fixtures';
import { actorsGenerator } from '../resources/actors/fixtures';
import { moviesGenerator } from '../resources/movies/fixtures';

const REGISTERED_GENERATORS = [
  usersGenerator,
  actorsGenerator,
  moviesGenerator,
];

const seed = async () => {
  await Database.connect();
  await Database.drop();
  await Promise.all(REGISTERED_GENERATORS.map(generate => generate()));
  await Database.disconnect();
};

seed();
