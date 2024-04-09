import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { configuredSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  configuredSwagger(app);

  await app.listen(3000, () => console.log('Server initializing in port 3000'));
}
bootstrap();
