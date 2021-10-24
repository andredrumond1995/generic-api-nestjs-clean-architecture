import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';


import { BaseRepository } from './base.repository';
import { UserModel } from '../../../domain/models/user.model';
import { IUserRepositoryPort } from 'src/application/ports/i.user.repository.port';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository extends BaseRepository<UserModel>
  implements IUserRepositoryPort {
  constructor(@InjectConnection() connection: Connection) {
    super(connection, UserEntity);
  }
}
