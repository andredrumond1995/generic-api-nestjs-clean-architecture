import { Injectable } from '@nestjs/common';
import { RoleAlreadyRegisteredException } from '@domain/exceptions/role.exception';
import { RoleDto } from '@presentation/dtos/role.dto';
import { RoleModel } from '@domain/models/role.model';
import { ApiCreateEditDeleteResponseType } from '@domain/shared/types/api.response.types';
import { IRoleRepositoryPort } from '@application/ports/i.role.repository.port';

@Injectable()
export class CreateRoleUseCase {
  constructor(private readonly iRoleRepositoryPort: IRoleRepositoryPort) {}
  async execute(roleDto: RoleDto): Promise<ApiCreateEditDeleteResponseType> {
    const role = await this.iRoleRepositoryPort.findOne({ name: roleDto.name });
    if (role) throw new RoleAlreadyRegisteredException();
    const createdRole: RoleModel = await this.iRoleRepositoryPort.save(roleDto);
    return { id: createdRole.id, message: `role successfully added` } as ApiCreateEditDeleteResponseType;
  }
}
