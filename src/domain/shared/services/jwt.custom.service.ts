import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { EnvironmentService } from '@domain/shared/environment/environment.service';
@Injectable()
export class JwtCustomService {
  constructor(private readonly jwtService: JwtService, private readonly environmentService: EnvironmentService) {}
  async generateJwtExpiresIn(payload, time) {
    payload['token'] = `Bearer ${await this.jwtService.sign(payload, { expiresIn: time, secret: this.environmentService.getEnv('JWT_SECRET') })}`;
    return payload;
  }
  async verifyJwt(jwt) {
    return await this.jwtService.verify(jwt, { secret: this.environmentService.getEnv('JWT_SECRET') });
  }
}
