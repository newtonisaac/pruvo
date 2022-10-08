import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CurrencyService } from './currency.service';

@Controller()
export class CurrencyServiceController {
  constructor(private readonly currencyService: CurrencyService) {}

  @MessagePattern('convertAmount')
  async convertAmount(@Payload() data: { from: string, to: string, amount: number }): Promise<number> {
    return await this.currencyService.convertAmount(data.from, data.to, data.amount)
  }

  @MessagePattern('requestRate')
  async requestRate(@Payload() data: { from: string, to: string, amount: number, email: string }): Promise<void> {
    await this.currencyService.requestRate(data.from, data.to, data.amount, data.email)
  }
 
}
