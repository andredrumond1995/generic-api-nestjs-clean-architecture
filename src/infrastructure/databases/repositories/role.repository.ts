import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';


import { BaseRepository } from './base.repository';
import { RoleModel } from '../../../domain/models/role.model';
import { IRoleRepositoryPort } from 'src/application/ports/i.role.repository.port';
import { RoleEntity } from '../entities/role.entity';

@Injectable()
export class RoleRepository extends BaseRepository<RoleModel>
  implements IRoleRepositoryPort {
  constructor(@InjectConnection() connection: Connection) {
    super(connection, RoleEntity);
  }
}
