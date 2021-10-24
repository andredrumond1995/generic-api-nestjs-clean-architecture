import { Injectable } from '@nestjs/common';
import { RoleModel } from '@domain/models/role.model';
import { IRoleRepositoryPort } from '@application/ports/i.role.repository.port';

@Injectable()
export class FindAllRoleUseCase {
	constructor(private readonly iRoleRepositoryPort: IRoleRepositoryPort) {}
	async execute(): Promise<RoleModel[]> {
		return await this.iRoleRepositoryPort.find();
	}
	
}
