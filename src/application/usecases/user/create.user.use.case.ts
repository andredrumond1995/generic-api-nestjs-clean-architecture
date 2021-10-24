import { MissingFieldOrInvalidTypeException } from '../../../domain/exceptions/internal.exception';
import { Injectable } from '@nestjs/common';
import { UserAlreadyRegisteredException } from '../../../domain/exceptions/user.exception';
import { UserDto } from '../../../presentation/dtos/user.dto';
import { UserModel } from '../../../domain/models/user.model';
import { IUserRepositoryPort } from '../../ports/i.user.repository.port';
import { IRoleRepositoryPort } from '../../ports/i.role.repository.port';
import { RoleModel } from '../../../domain/models/role.model';
import { ApiCreateEditDeleteResponseType } from '../../../domain/shared/types/api.response.types';
import { FindByEmailUserUseCase } from './find.by.email.user.use.case';
import { CreateUpdateHandlerUserUseCase } from './create.update.handler.user.use.case';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly createUpdateHandlerUserUseCase: CreateUpdateHandlerUserUseCase, private readonly findByEmailUserUseCase: FindByEmailUserUseCase) {}
  async execute(userDto: UserDto | UserModel): Promise<ApiCreateEditDeleteResponseType> {
    const user = await this.findByEmailUserUseCase.execute(userDto.email);
    if (user) throw new UserAlreadyRegisteredException();
    const createdUser: UserModel = await this.createUpdateHandlerUserUseCase.execute(userDto);
    return { id: createdUser.id, message: `user successfully added` } as ApiCreateEditDeleteResponseType;
  }
}
