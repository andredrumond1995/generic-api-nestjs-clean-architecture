import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from '@presentation/controllers/user.controller';
import { AuthModule } from './auth.module';
import { IUserRepositoryPort } from '@application/ports/i.user.repository.port';
import { UserRepository } from '../databases/repositories/user.repository';
import { RoleRepository } from '../databases/repositories/role.repository';
import { IRoleRepositoryPort } from '@application/ports/i.role.repository.port';
import { EnvironmentService } from '@domain/shared/environment/environment.service';
import { FindByEmailUserUseCase } from '@application/usecases/user/find.by.email.user.use.case';
import { DeleteUserUseCase } from '@application/usecases/user/delete.user.use.case';
import { FindAllUserUseCase } from '@application/usecases/user/find.all.user.use.case';
import { CreateUserUseCase } from '@application/usecases/user/create.user.use.case';
import { CreateUpdateHandlerUserUseCase } from '@application/usecases/user/create.update.handler.user.use.case';
import { UpdateUserUseCase } from '@application/usecases/user/update.user.use.case';
import { ValidateUserAuthUseCase } from '@application/usecases/auth/validate.user.auth.use.case';
import { JwtCustomService } from '@domain/shared/services/jwt.custom.service';
import { AuthMiddleware } from '@presentation/middlewares/auth.middleware';
import { SetUserDataInRequestAuthUseCase } from '@application/usecases/auth/set.user.data.in.request.auth.use.case';
@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [
    EnvironmentService,
    JwtCustomService,
    FindAllUserUseCase,
    FindByEmailUserUseCase,
    UpdateUserUseCase,
    CreateUserUseCase,
    DeleteUserUseCase,
    CreateUpdateHandlerUserUseCase,
    SetUserDataInRequestAuthUseCase,
    { provide: IUserRepositoryPort, useClass: UserRepository },
    { provide: IRoleRepositoryPort, useClass: RoleRepository },
    ValidateUserAuthUseCase,
  ],
})
//export class UserModule {}
//só comentar a linha acima e descomentar as demais abaixo para ativar auth nas rotas de user
 export class UserModule implements NestModule {
     configure(consumer: MiddlewareConsumer) {
       consumer.apply(AuthMiddleware).forRoutes(UserController)
     }
 }
