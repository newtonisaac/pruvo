import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { CurrencyGatewayController } from './currency-gateway.controller';
import { CurrencyGatewayService } from './currency-gateway.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'currency-service',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://broker_user:broker_pass@localhost:5672'],
          queue: 'currency_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [CurrencyGatewayController],
  providers: [CurrencyGatewayService],
})
export class CurrencyGatewayModule {}
