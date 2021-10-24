import { Module } from '@nestjs/common';
import { HttpExceptionFilterProvider } from '../rest/filters/http-exception.filter';
import { DataResponseInterceptorProvider } from '../rest/interceptors/data.response.interceptor';
import { UserModule } from './user.module';
import { AuthModule } from './auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfigs from '../configs/typeorm/database';
import { UtilsService } from '@domain/shared/services/utils.service';
import { AppUseCase } from '@application/usecases/app.use.case';
import { LoggingInterceptorProvider } from '../rest/interceptors/logging.interceptor';
import { AppController } from '@presentation/controllers/app.controller';
import { RoleModule } from './role.module';
import { EnvironmentService } from '@domain/shared/environment/environment.service';
import { EnvironmentModule } from '@domain/shared/environment/enviroment.module';
import { CustomLoggerService } from '@domain/shared/services/custom.logger.service';
import { APP_GUARD } from '@nestjs/core';
import { RoleBasedAuthGuard } from '@infrastructure/rest/guards/role.based.auth.guard';
@Module({
  imports: [
    EnvironmentModule,
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentModule],
      useFactory: (environmentService: EnvironmentService) => databaseConfigs(environmentService),
      inject: [EnvironmentService],
    }),
    AuthModule,
    UserModule,
    RoleModule,
    CustomLoggerService,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RoleBasedAuthGuard,
    },
    AppUseCase,
    CustomLoggerService,
    UtilsService,
    LoggingInterceptorProvider,
    HttpExceptionFilterProvider,
    DataResponseInterceptorProvider,
  ],
})
export class AppModule {}
