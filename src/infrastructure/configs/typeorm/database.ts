import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm"
import { EnvironmentService } from "@domain/shared/environment/environment.service";
const setEntitiesDirByEnvironment = (environmentService: EnvironmentService) => {
  const dir: string = environmentService.getEnv('NODE_ENV') !== 'test' ? '/../../../**/*.entity{.ts,.js}' : '/../../../../**/*.entity{.ts,.js}'
  return dir
}
const databaseConfigs = (environmentService: EnvironmentService)=> ({
  type: 'sqlite',
  entities: [__dirname + setEntitiesDirByEnvironment(environmentService)],
  database: `${environmentService.getEnv('SQLITE_DB_HOST')}/${environmentService.getEnv('SQLITE_DB_NAME')}`,
  synchronize: true,
  logging: false
}) as TypeOrmModuleAsyncOptions;

export default databaseConfigs;
