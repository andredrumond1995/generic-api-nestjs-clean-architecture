import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RoleController } from '@presentation/controllers/role.controller';
import { AuthModule } from './auth.module';
import { IRoleRepositoryPort } from '@application/ports/i.role.repository.port';
import { RoleRepository } from '../databases/repositories/role.repository';
import { UserRepository } from '../databases/repositories/user.repository';
import { IUserRepositoryPort } from '@application/ports/i.user.repository.port';
import { EnvironmentService } from '@domain/shared/environment/environment.service';
import { FindByEmailUserUseCase } from '@application/usecases/user/find.by.email.user.use.case';
import { FindAllRoleUseCase } from '@application/usecases/role/find.all.role.use.case';
import { UpdateRoleUseCase } from '@application/usecases/role/update.role.use.case';
import { DeleteRoleUseCase } from '@application/usecases/role/delete.role.use.case';
import { CreateRoleUseCase } from '@application/usecases/role/create.role.use.case';
import { ValidateUserAuthUseCase } from '@application/usecases/auth/validate.user.auth.use.case';
import { JwtCustomService } from '@domain/shared/services/jwt.custom.service';
@Module({
  imports: [AuthModule],
  controllers: [RoleController],
  providers: [
    EnvironmentService,
    JwtCustomService,
    FindByEmailUserUseCase,
    FindAllRoleUseCase,
    UpdateRoleUseCase,
    DeleteRoleUseCase,
    CreateRoleUseCase,
    { provide: IUserRepositoryPort, useClass: UserRepository },
    { provide: IRoleRepositoryPort, useClass: RoleRepository },
    ValidateUserAuthUseCase,
  ],
})
export class RoleModule {}
//só comentar a linha acima e descomentar as demais abaixo para ativar auth nas rotas de role
//  export class RoleModule implements NestModule {
//      configure(consumer: MiddlewareConsumer) {
//        consumer.apply(AuthMiddleware).forRoutes(RoleController)
//      }
//  }
