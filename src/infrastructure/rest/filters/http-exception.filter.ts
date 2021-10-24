import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { APP_FILTER } from '@nestjs/core';
import { AppUseCase } from '@application/usecases/app.use.case';
import { EnvironmentService } from '@domain/shared/environment/environment.service';
import { CustomLoggerService } from '@domain/shared/services/custom.logger.service';
export interface ICustomResponseData {
  http_code: number;
  timestamp: string;
  path: string;
  http_method: string;
  error?: any;
  data?: any;
  stack?: any;
}
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly environmentService: EnvironmentService,
    private readonly customLoggerService: CustomLoggerService,
    private readonly appUseCase: AppUseCase,
  ) {}
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = <any>exception.getResponse();
    if (exceptionResponse['statusCode']) delete exceptionResponse['statusCode'];
    const responseData = {
      http_code: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      http_method: request.method,
      error: exceptionResponse,
      stack:
       this.environmentService.getEnv('NODE_ENV') === 'development' ? exception.stack : undefined,
    } as ICustomResponseData;
    const { stack, ...loggingErrorData } = responseData;
    this.customLoggerService.log(
      this.appUseCase.getAppLoggingData(
        responseData.path,
        responseData.http_method,
        request.ip,
        responseData.http_code,
      ),
      'HttpExceptionFilter',
    );
    this.customLoggerService.error(
      JSON.stringify(loggingErrorData),
      stack,
      'HttpExceptionFilter',
    );
    response.status(status).json(responseData);
  }
}

export const HttpExceptionFilterProvider = {
  provide: APP_FILTER,
  useClass: HttpExceptionFilter,
};
