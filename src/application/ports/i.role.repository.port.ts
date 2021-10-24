import { RoleModel } from '@domain/models/role.model';
import { Injectable } from '@nestjs/common';
import { IBaseRepositoryPort } from './i.base.repository.port';

@Injectable()
export abstract class IRoleRepositoryPort extends IBaseRepositoryPort<RoleModel> {}
