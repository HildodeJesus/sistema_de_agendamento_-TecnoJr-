import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function configuredSwagger(app) {
  const config = new DocumentBuilder().build();
  const document = SwaggerModule.createDocument(app, config);
  return SwaggerModule.setup('api/doc', app, document);
}
