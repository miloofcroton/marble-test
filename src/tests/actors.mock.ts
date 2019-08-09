import * as faker from 'faker';
import { ActorsMethods, Gender } from '@api/actors';

export const mockActor = async () =>
  ActorsMethods.model.create({
    imdbId: faker.random.uuid(),
    name: faker.name.firstName() + ' ' + faker.name.lastName(),
    birthday: faker.date.past(),
    country: faker.address.country(),
    gender: faker.random.arrayElement([Gender.FEMALE, Gender.MALE]),
  });
