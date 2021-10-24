import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { AuthController } from '@presentation/controllers/auth.controller';
import { IUserRepositoryPort } from '@application/ports/i.user.repository.port';
import { UserRepository } from '../databases/repositories/user.repository';
import { IRoleRepositoryPort } from '@application/ports/i.role.repository.port';
import { RoleRepository } from '../databases/repositories/role.repository';
import { EnvironmentService } from '@domain/shared/environment/environment.service';
import { FindByEmailUserUseCase } from '@application/usecases/user/find.by.email.user.use.case';
import { ValidateUserAuthUseCase } from '@application/usecases/auth/validate.user.auth.use.case';
import { JwtCustomService } from '@domain/shared/services/jwt.custom.service';

@Module({
  imports: [JwtModule.register({})],
  providers: [EnvironmentService, JwtCustomService, ValidateUserAuthUseCase, FindByEmailUserUseCase, { provide: IUserRepositoryPort, useClass: UserRepository }, { provide: IRoleRepositoryPort, useClass: RoleRepository }],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}
