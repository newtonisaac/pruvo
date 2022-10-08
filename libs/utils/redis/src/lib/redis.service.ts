import { Injectable, Logger } from '@nestjs/common';
import { RedisClient } from 'redis';

@Injectable()
export default class RedisService {
  constructor(private client: RedisClient) {}

  public async get(pattern: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.get(pattern, (err, reply: any) => {
        if (err) {
          Logger.error(
            'RedisService: get - ' + err,
            undefined,
            RedisService.name
          );
          reject();
        }

        if (!reply) {
          resolve(null);
        }

        resolve(JSON.parse(reply));
      });
    });
  }

  public async set(
    pattern: string,
    value: any,
    seconds = 300,
    options?: { databaseNumber?: number }
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.set(
        pattern,
        JSON.stringify(value),
        'EX',
        seconds,
        (err, reply: any) => {
          if (err) {
            Logger.error(
              `RedisService: - set ${pattern} ` + err,
              undefined,
              RedisService.name
            );
            reject();
          }
          resolve();
        }
      );
    });
  }
}
