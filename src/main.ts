// import * as path from 'path';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { PORT } from 'config/constants';

// const bootstrapPath = path.resolve(__dirname, '../tsconfig-paths-bootstrap');
// import(bootstrapPath);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap();
