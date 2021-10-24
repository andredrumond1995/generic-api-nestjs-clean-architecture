import { Injectable } from '@nestjs/common';
import { IUserRepositoryPort } from '../../ports/i.user.repository.port';
import { ApiCreateEditDeleteResponseType } from '../../../domain/shared/types/api.response.types';

@Injectable()
export class DeleteUserUseCase {
	constructor(private readonly iUserRepositoryPort: IUserRepositoryPort) {}
	
	async execute(id: string | number): Promise<ApiCreateEditDeleteResponseType> {
		await this.iUserRepositoryPort.delete(id);
		return { id: id, message: `user successfully deleted` } as ApiCreateEditDeleteResponseType;
	}

}
