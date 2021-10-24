import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthorizationNotFoundException } from '@domain/exceptions/header.exception';
import { InvalidJwtToken } from '@domain/exceptions/jwt.exceptions';
import { JwtCustomService } from '@domain/shared/services/jwt.custom.service';
import { SetUserDataInRequestAuthUseCase } from '@application/usecases/auth/set.user.data.in.request.auth.use.case';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtCustomService: JwtCustomService, private readonly setUserDataInRequestAuthUseCase: SetUserDataInRequestAuthUseCase) {}
  async use(req: Request, res: Response, next: any) {
    const headers = req.headers;
    if (!headers['authorization']) throw new AuthorizationNotFoundException();
    await this.jwtCustomService
      .verifyJwt(headers['authorization'].replace('Bearer ', ''))
      .then((jwtDecrypted) => this.setUserDataInRequestAuthUseCase.execute(jwtDecrypted['user']))
      .then(() => next())
      .catch((jwtError) => {
        throw new InvalidJwtToken(jwtError.message);
      });
  }
}
