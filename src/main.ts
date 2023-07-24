import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { PORT } from 'config/constants';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: true }));
  await app.listen(process.env.PORT || PORT);
}
bootstrap();
