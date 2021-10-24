import { CacheManagerOptions } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const cacheManagerConfigs = (configService: ConfigService)=> ({
   ttl: configService.get<number>(`system.CACHE_MANAGER_TTL`)
  }) as CacheManagerOptions;
export default cacheManagerConfigs;
