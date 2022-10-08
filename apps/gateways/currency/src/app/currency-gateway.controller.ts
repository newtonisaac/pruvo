import { Controller, Get, Query } from '@nestjs/common';

import { CurrencyGatewayService } from './currency-gateway.service';

@Controller()
export class CurrencyGatewayController {
  constructor(private readonly currencyGatewayService: CurrencyGatewayService) {}

  @Get('/convert')
  getRate(@Query() query: { from: string, to: string, amount: number }) {
    return this.currencyGatewayService.convertAmount(query.from, query.to, query.amount);
  }

  @Get('/requestRate')
  async requestRate(@Query() query: { from: string, to: string, amount: number, email: string }) {
    await this.currencyGatewayService.requestRate(query.from, query.to, query.amount, query.email);

    return 'ok'
  }
}
