import { NestFactory } from '@nestjs/core';
import dotenv = require('dotenv');

import { HttpErrorFilter } from './filters/httpError.filter';
import { AppModule } from './app.module';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpErrorFilter());
  app.enableCors();

  await app.listen(process.env.PORT);
}
bootstrap();
