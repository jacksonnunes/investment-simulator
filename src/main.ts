import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cors from 'cors';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());

  const config = new DocumentBuilder()
    .setTitle('Calculadora Renda Fixa')
    .setDescription(
      'API que calcula e compara investimentos em renda fixa para obter o melhor retorno.',
    )
    .setVersion('1.0.0')
    .addTag('Cálculo')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3333);
}
bootstrap();
