import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';
import { ValidationPipe } from '@nestjs/common';

const port = process.env.PORT || 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  setupSwagger(app);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(port, () =>
    console.log(`Server initializing in port ${port}`),
  );
}
bootstrap();
