import { CreateUpdateHandlerUserUseCase } from '@application/usecases/user/create.update.handler.user.use.case';
import { CreateUserUseCase } from '@application/usecases/user/create.user.use.case';
import { FindByEmailUserUseCase } from '@application/usecases/user/find.by.email.user.use.case';
import { factoryTestProvider } from '@tests/__mocks__/generic';
import { mockedDataUserFactory } from '@tests/__mocks__/user/generic';
import { mockFindByEmailUserUseCaseModulesForTesting, mockFindByEmailUserUseCaseProvider } from '@tests/__mocks__/user/usecases/create.user.use.case';

describe('CreateUserUseCase', () => {
  
  let factoryTestProviders;
  let mockedFindByEmailUserUseCase: FindByEmailUserUseCase;
  let mockedCreateUserUseCase: CreateUserUseCase;
  let mockedCreateUpdateHandlerUserUseCase : CreateUpdateHandlerUserUseCase;

  beforeAll(async () => {
    factoryTestProviders = await factoryTestProvider(mockFindByEmailUserUseCaseProvider, mockFindByEmailUserUseCaseModulesForTesting);
    mockedFindByEmailUserUseCase = factoryTestProviders.FindByEmailUserUseCase;
    mockedCreateUserUseCase = factoryTestProviders.CreateUserUseCase;
    mockedCreateUpdateHandlerUserUseCase = factoryTestProviders.CreateUpdateHandlerUserUseCase;
  });
  //const mockFindByEmailUserUseCase = FindByEmailUserUseCase as jest.Mock<FindByEmailUserUseCase>;
  //const mockedFindByEmailUserUseCase = new mockFindByEmailUserUseCase() as jest.Mocked<FindByEmailUserUseCase>;

  describe('create', () => {
    it('should create an user' , async () => {
      const user = mockedDataUserFactory();
      const response = { id: user.id, message: `user successfully added` };
      jest.spyOn(mockedFindByEmailUserUseCase, 'execute').mockImplementationOnce(async () => undefined);
      jest.spyOn(mockedCreateUpdateHandlerUserUseCase, 'execute').mockImplementationOnce(async () => user);
      const sut = await mockedCreateUserUseCase.execute(user);
      expect(sut).not.toBeUndefined();
      expect(sut).toEqual(response);
    });
  });
});
