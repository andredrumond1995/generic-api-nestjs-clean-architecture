import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import fs = require('fs');
import { EnvironmentService } from 'src/domain/shared/environment/environment.service';
const environmentService = new EnvironmentService();
function main() {
  fs.writeFileSync('ormconfig.json', JSON.stringify(getTypeOrmConfiguration(), null, 2));
}
function getTypeOrmConfiguration(): TypeOrmModuleOptions {
  return {
    type: 'sqlite',
    entities: ['src/infrastructure/databases/entities/*.entity{.ts,.js}'],
    migrations: ['migrations/*{.ts,.js}'],
    cli: {
      entitiesDir: 'src/infrastructure/databases/entities/',
      migrationsDir: 'migrations/',
    },
    database: `${environmentService.getEnv('SQLITE_DB_HOST')}/${environmentService.getEnv('SQLITE_DB_NAME')}`,
    synchronize: true,
    logging: false,
  };
}
main();
