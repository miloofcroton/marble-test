import * as faker from 'faker';
import { UserRole, UsersMethods } from '@api/users';

export const mockUser = async (roles = [UserRole.USER]) =>
  UsersMethods.model.create({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roles,
  });
