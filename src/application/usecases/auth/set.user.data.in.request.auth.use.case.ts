import { UserModel } from '@domain/models/user.model';
import { Inject, Injectable } from '@nestjs/common';

import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
@Injectable()
export class SetUserDataInRequestAuthUseCase {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  async execute(user: UserModel): Promise<void> {
    this.request['user'] = user;
  }
}
