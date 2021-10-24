import { Injectable } from '@nestjs/common';
import { UserModel } from '../../../domain/models/user.model';
import { IUserRepositoryPort } from "@application/ports/i.user.repository.port";
@Injectable()
export class FindAllUserUseCase {
  constructor(private readonly iUserRepositoryPort: IUserRepositoryPort) {}
  async execute(): Promise<UserModel[]> {
    return await this.iUserRepositoryPort.find({ relations: ['roles'] });
  }
}
