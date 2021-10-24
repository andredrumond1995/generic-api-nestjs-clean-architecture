import { Module } from '@nestjs/common';
import { EnvironmentService } from './environment.service';

@Module({
	providers: [ { provide: EnvironmentService, useClass: EnvironmentService } ],
	exports: [ EnvironmentService ]
})
export class EnvironmentModule {}
