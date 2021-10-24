import { Injectable } from '@nestjs/common';
import { ApiCreateEditDeleteResponseType } from '@domain/shared/types/api.response.types';
import { IRoleRepositoryPort } from '@application/ports/i.role.repository.port';
@Injectable()
export class DeleteRoleUseCase {
	constructor(private readonly iRoleRepositoryPort: IRoleRepositoryPort) {}
	async execute(id: string | number): Promise<ApiCreateEditDeleteResponseType> {
		await this.iRoleRepositoryPort.delete(id);
		return { id: id, message: `role successfully deleted` } as ApiCreateEditDeleteResponseType;
	}
}
