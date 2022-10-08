import { DynamicModule, Module } from '@nestjs/common';
import { RedisClient } from 'redis';
import RedisService from './redis.service';

@Module({})
export class RedisModule {
  static register(options: { host: string; port: number }): DynamicModule {
    const redis_client_provider = {
      provide: RedisClient,
      useValue: this.createClient(options.host, options.port),
    };

    return {
      module: RedisModule,
      providers: [RedisService, redis_client_provider],
      exports: [RedisService, redis_client_provider],
    };
  }

  public static createClient(
    host: string,
    port: number,
    databaseNumber = 0
  ): RedisClient {
    return new RedisClient({
      host,
      port,
      db: databaseNumber,
    });
  }
}
