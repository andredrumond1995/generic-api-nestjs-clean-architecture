import { RoleNotFoundException } from '@domain/exceptions/role.exception';
import { Injectable } from '@nestjs/common';
import { RoleDto } from '@presentation/dtos/role.dto';
import { ApiCreateEditDeleteResponseType } from '@domain/shared/types/api.response.types';
import { IRoleRepositoryPort } from '@application/ports/i.role.repository.port';

@Injectable()
export class UpdateRoleUseCase {
  constructor(private readonly iRoleRepositoryPort: IRoleRepositoryPort) {}

  async execute(roleDto: RoleDto, id: number): Promise<ApiCreateEditDeleteResponseType> {
    const role = await this.iRoleRepositoryPort.findOne({ id });
    if (!role) throw new RoleNotFoundException();
    delete role.updated_at;
    const dataToBeUpdated = { ...role, ...roleDto };
    console.log(dataToBeUpdated);
    await this.iRoleRepositoryPort.update({ id }, dataToBeUpdated);
    return { id: id, message: `role successfully updated` } as ApiCreateEditDeleteResponseType;
  }
}
