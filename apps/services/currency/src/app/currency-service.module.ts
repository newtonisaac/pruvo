import { Module } from '@nestjs/common';
import { OpenexchangeClient } from '@pruvo-monorepo/integrations/openexchange';
import { RedisModule } from '@pruvo-monorepo/utils/redis';

import { CurrencyServiceController } from './currency-service.controller';
import { CurrencyService } from './currency.service';

@Module({
  imports: [RedisModule.register({ host: 'localhost', port: 6379 })],
  controllers: [CurrencyServiceController],
  providers: [
    CurrencyService,
    {
      provide: OpenexchangeClient,
      useValue: OpenexchangeClient.create({
        baseUrl: 'https://openexchangerates.org/api',
        apiKey: 'c3b3111458054658b4ca169f0ded69be',
      }),
    },
  ],
})
export class CurrencyServiceModule {}
