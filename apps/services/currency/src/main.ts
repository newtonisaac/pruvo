import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { CurrencyServiceModule } from './app/currency-service.module';

async function bootstrap() {
  
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(CurrencyServiceModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://broker_user:broker_pass@localhost:5672'],
      queue: 'currency_queue',
      queueOptions: {
        durable: false
      },
    },
  });

  app.listen()
}

bootstrap();
