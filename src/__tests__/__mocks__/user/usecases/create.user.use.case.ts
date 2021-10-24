import { CreateUpdateHandlerUserUseCase } from '@application/usecases/user/create.update.handler.user.use.case';
import { CreateUserUseCase } from '@application/usecases/user/create.user.use.case';
import { FindByEmailUserUseCase } from '@application/usecases/user/find.by.email.user.use.case';
import { IRoleRepositoryPort } from '../../../../application/ports/i.role.repository.port';
import { IUserRepositoryPort } from '../../../../application/ports/i.user.repository.port';

export const mockFindByEmailUserUseCaseProvider = [
  {
    provide: FindByEmailUserUseCase,
    useFactory: () => ({ execute: jest.fn() }),
  },
  IUserRepositoryPort,
  CreateUserUseCase,
  {
    provide: CreateUpdateHandlerUserUseCase,
    useFactory: () => ({ execute: jest.fn() }),
  },
  IRoleRepositoryPort,
];

export const moduleMockFindByEmailUserUseCase = { name: 'FindByEmailUserUseCase', module: FindByEmailUserUseCase };
export const moduleMockCreateUserUseCase = { name: 'CreateUserUseCase', module: CreateUserUseCase };
export const moduleMockCreateUpdateHandlerUserUseCase = { name: 'CreateUpdateHandlerUserUseCase', module: CreateUpdateHandlerUserUseCase };
export const mockFindByEmailUserUseCaseModulesForTesting = [moduleMockFindByEmailUserUseCase, moduleMockCreateUserUseCase, moduleMockCreateUpdateHandlerUserUseCase];
