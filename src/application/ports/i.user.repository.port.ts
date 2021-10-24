import { UserModel } from '@domain/models/user.model';
import { Injectable } from '@nestjs/common';
import { IBaseRepositoryPort } from './i.base.repository.port';

@Injectable()
export abstract class IUserRepositoryPort extends IBaseRepositoryPort<UserModel> {}
