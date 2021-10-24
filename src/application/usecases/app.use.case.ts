import {  Injectable } from '@nestjs/common';
import { EnvironmentService } from '@domain/shared/environment/environment.service';
import { UtilsService } from '@domain/shared/services/utils.service';
import { AppLoggingDto } from '@presentation/dtos/app.dto';

@Injectable()
export class AppUseCase {
  constructor(
    private environmentService: EnvironmentService,
    private readonly utilsService: UtilsService,
  ) {}
  rootPathMsg() {
    return {
      status: true,
      data: `root path`,
      api_version: this.environmentService.getEnv('API_VERSION'),
      environment: this.environmentService.getEnv('NODE_ENV'),
    };
  }
  getAppLoggingData(
    path: string,
    http_method: string,
    requester_ip: string,
    http_code,
  ): string {
    const loggingData = {
      server: this.utilsService.currentIpAddress(),
      method: http_method,
      statusCode: http_code,
      routePath: path,
      requestFrom: requester_ip,
      date: this.utilsService.current_date(),
    } as AppLoggingDto;
    return JSON.stringify(loggingData);
  }
}
