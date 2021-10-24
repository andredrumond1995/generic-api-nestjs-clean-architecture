import { UserNotFoundException } from '../../../domain/exceptions/user.exception';
import { Injectable } from '@nestjs/common';
import { UserDto } from '../../../presentation/dtos/user.dto';
import { UserModel } from '../../../domain/models/user.model';
import { IUserRepositoryPort } from '../../ports/i.user.repository.port';
import { ApiCreateEditDeleteResponseType } from '../../../domain/shared/types/api.response.types';
import { CreateUpdateHandlerUserUseCase } from './create.update.handler.user.use.case';

@Injectable()
export class UpdateUserUseCase {
	constructor(private readonly iUserRepositoryPort: IUserRepositoryPort, private readonly createUpdateHandlerUserUseCase: CreateUpdateHandlerUserUseCase) {}

	async execute(userDto: UserDto | UserModel, id: number): Promise<ApiCreateEditDeleteResponseType> {
		const user = await this.iUserRepositoryPort.findOne({ id });
		if (!user) throw new UserNotFoundException();
		await this.createUpdateHandlerUserUseCase.execute(userDto, user);
		return { id: id, message: `user successfully updated` } as ApiCreateEditDeleteResponseType;
	}
}
