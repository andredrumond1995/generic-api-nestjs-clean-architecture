import { Injectable } from '@nestjs/common';
import { UserModel } from '../../../domain/models/user.model';
import { IUserRepositoryPort } from '../../ports/i.user.repository.port';

@Injectable()
export class FindByEmailUserUseCase {
  constructor(private readonly iUserRepositoryPort: IUserRepositoryPort) {}

  async execute(email: string): Promise<UserModel> {
    return await this.iUserRepositoryPort.findOne({ email: email }, { relations: [ 'roles' ] });
  }
}
