import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CurrencyGatewayService {
  constructor(
    @Inject('currency-service') private currencyServiceClient: ClientProxy
  ) {}

  async convertAmount(
    from: string,
    to: string,
    amount: number
  ): Promise<number> {
    return await this.currencyServiceClient
      .send<number>('convertAmount', { from, to, amount })
      .toPromise();
  }

  async requestRate(
    from: string,
    to: string,
    amount: number,
    email: string
  ): Promise<void> {
    await this.currencyServiceClient
      .send<void>('requestRate', { from, to, amount, email })
      .toPromise();
  }
}
