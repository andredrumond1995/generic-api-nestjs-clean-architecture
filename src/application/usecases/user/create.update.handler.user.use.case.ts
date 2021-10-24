import { MissingFieldOrInvalidTypeException } from '../../../domain/exceptions/internal.exception';
import { Injectable } from '@nestjs/common';
import { UserDto } from '../../../presentation/dtos/user.dto';
import { UserModel } from '../../../domain/models/user.model';
import { IUserRepositoryPort } from '../../ports/i.user.repository.port';
import { IRoleRepositoryPort } from '../../ports/i.role.repository.port';
import { RoleModel } from '../../../domain/models/role.model';
import { FindByEmailUserUseCase } from './find.by.email.user.use.case';
@Injectable()
export class CreateUpdateHandlerUserUseCase {
  constructor(private readonly iUserRepositoryPort: IUserRepositoryPort, private readonly iRoleRepositoryPort: IRoleRepositoryPort, private readonly findByEmailUserUseCase: FindByEmailUserUseCase) {}

  async execute(userDto: UserDto | UserModel, userFromDatabaseToBeUpdated?: UserModel) {
    let data = {};
    const areRoleIdsValid = await this.areRoleIdsValid(<number[]>(<unknown>userDto.roles));
    if (!areRoleIdsValid.valid) throw new MissingFieldOrInvalidTypeException(`one or more ids from roles property ${JSON.stringify(userDto.roles)} are invalid.`);
    userDto.roles = areRoleIdsValid.roles;
    if (userFromDatabaseToBeUpdated) {
      delete userFromDatabaseToBeUpdated.updated_at;
      data = { ...userFromDatabaseToBeUpdated, ...userDto };
    } else {
      data = userDto;
    }

    return await this.iUserRepositoryPort.save(data);
  }
  private async areRoleIdsValid(roleIds: number[]): Promise<{ valid: boolean; roles: RoleModel[] }> {
    let valid = true;
    const roles: RoleModel[] = [];
    for (const id of roleIds) {
      const role: RoleModel = await this.iRoleRepositoryPort.findOne({ id });
      if (!role) {
        valid = false;
      } else {
        roles.push(role);
      }
    }
    return { valid, roles };
  }
}
