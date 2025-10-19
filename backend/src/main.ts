import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());

  const config = new DocumentBuilder()
    .setTitle('Mini Admin Panel API')
    .setDescription(
      'CRUD, Protobuf export, and Crypto verification backend for the Admin Panel project.',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(4000);
  console.log('Backend running at http://localhost:4000');
  console.log('Swagger Docs available at http://localhost:4000/api-docs');
}
bootstrap();
