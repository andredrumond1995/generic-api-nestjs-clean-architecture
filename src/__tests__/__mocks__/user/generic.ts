import * as faker from 'faker';

import { RoleModel } from '../../../domain/models/role.model';
import { UserModel } from '../../../domain/models/user.model';
export const mockUserData = () =>
  ({
    id: faker.random.number(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roles: [],
  } as UserModel);
export const mockRoleData = () => ({ id: faker.random.number(), name: faker.name.findName() } as RoleModel);

export const mockedDataRoleFactory = () => new RoleModel(mockRoleData());

export const mockedDataUserFactory = () => new UserModel(mockUserData());
