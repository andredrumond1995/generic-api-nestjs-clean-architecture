import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppUseCase } from '@application/usecases/app.use.case';

@Controller(`/`)
@ApiTags(`root`)
export class AppController {
  constructor(private readonly appUseCase: AppUseCase) {}

  @Get(`/`)
  getHello() {
    return this.appUseCase.rootPathMsg();
  }
}
