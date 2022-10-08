import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { CurrencyGatewayModule } from './app/currency-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(CurrencyGatewayModule);
  const globalPrefix = 'currency';
  
  app.setGlobalPrefix(globalPrefix);
  
  const port = process.env.PORT || 3333;
  
  await app.listen(port);
  
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
