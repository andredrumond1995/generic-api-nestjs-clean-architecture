import { EnvironmentService } from '@domain/shared/environment/environment.service';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '@infrastructure/ioc/app.module';
import * as helmet from 'helmet';
import { CustomLoggerService } from '@domain/shared/services/custom.logger.service';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	app.use(helmet());
	const environmentService: EnvironmentService = app.get(EnvironmentService);
	const options = new DocumentBuilder()
		.setTitle('Nestjs Clean Architecture')
		.addBearerAuth({ type: 'apiKey', scheme: 'bearer', bearerFormat: 'JWT', name: 'Authorization', in: 'header' }, 'jwt-access-token')
		.addTag(environmentService.getEnv('API_VERSION'))
		.setDescription('Sample API template')
		.setVersion(environmentService.getEnv('API_VERSION'))
		.build();
	const document = SwaggerModule.createDocument(app, options);

	SwaggerModule.setup(environmentService.getEnv('API_DOC_ENDPOINT'), app, document);
	const logger: CustomLoggerService = app.get(CustomLoggerService);

	await app.listen(environmentService.getEnv('SERVER_PORT'), () => {
		logger.log(`API running in '${environmentService.getEnv('NODE_ENV')}' environment`, 'AppConfiguration');
		logger.log(`API running on port ${environmentService.getEnv('SERVER_PORT')}`, 'AppConfiguration');
	});
}
bootstrap();
