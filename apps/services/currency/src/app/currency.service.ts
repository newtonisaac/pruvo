import { Injectable, Logger } from '@nestjs/common';
import {
  OpenexchangeClient,
  Rates,
} from '@pruvo-monorepo/integrations/openexchange';
import RedisService from 'libs/utils/redis/src/lib/redis.service';

@Injectable()
export class CurrencyService {
  constructor(
    private openexchangeClient: OpenexchangeClient,
    private redisService: RedisService
  ) {}

  async convertAmount(
    from: string,
    to: string,
    amount: number
  ): Promise<number> {
    const dailyRates = await this.getDailyRates();

    if (!dailyRates || !dailyRates[from] || !dailyRates[to]) {
      return 0; // not doing exception handling, just return 0
    }

    const usdAmount = amount / dailyRates[from]; // converting firt to USD

    const resultAmount = usdAmount * dailyRates[to];

    Logger.debug(
      `converted ${amount} amount from ${from} to ${to}: ${resultAmount}`
    );

    return resultAmount;
  }

  async requestRate(
    from: string,
    to: string,
    amount: number,
    email: string
  ): Promise<void> {
    const amountResult = await this.convertAmount(from, to, amount);

    this.sendEmail(from, to, amount, amountResult, email);
  }

  private async sendEmail(
    from: string,
    to: string,
    amount: number,
    resultAmount: number,
    email: string
  ) {
    Logger.debug(
      `requestRate sent to ${email}`
    );
  }

  private async getDailyRates(): Promise<Rates> {
    const now = new Date();

    const cacheKey = `cache:dailyrates:${now.toISOString().slice(0, 10)}`;

    // I am assuming that the rates change daily,
    // if they change by hour, I would setup the cache by hour
    const cachedDailyRates = await this.redisService.get(cacheKey);
    if (cachedDailyRates) {
      return cachedDailyRates;
    }

    const ratesResponse = await this.openexchangeClient.getDayRate(now);

    await this.redisService.set(cacheKey, ratesResponse.rates, 60 * 60 * 24); // 1 day cache

    return ratesResponse.rates;
  }
}
