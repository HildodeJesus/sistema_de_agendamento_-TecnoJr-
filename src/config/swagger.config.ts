import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PathsObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('NestJS application to TecnoJr')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  paths = document.paths;
  SwaggerModule.setup('documentation', app, document);
}

export let paths: PathsObject;
