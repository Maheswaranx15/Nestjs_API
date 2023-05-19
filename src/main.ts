/* eslint-disable no-nested-ternary */
/* eslint-disable no-void */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';

import { AppModule } from './app.module';

// for loading the .env local variables
config();

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // app.setGlobalPrefix('/api/v1');
  const PORT: number | string = process.env.PORT || 3000;

  app.enableCors({ credentials: true, origin: true });

  const serverUrl =
    process.env.SERVER_URL ||
    (process.env.DEV_MODE === 'true'
      ? `http://localhost:${PORT}`
      : process.env.NODE_ENV === 'ProdStage'
      ? 'https://platform-onboarding.indi.gg'
      : 'https://platform-onboarding.devindigg.com');

  const options = new DocumentBuilder()
    .setVersion('1.0')
    .setTitle('IndiGG Platform Onboarding API')
    .setDescription('IndiGG Platform API for onboarding users.')
    .setContact('IndiGG Platform Engineering Team', 'https://indi.gg', 'support@indi.gg')
    .setExternalDoc('Developer Documentation', 'https://indigg-api-docs.netlify.app/')
    .setLicense('Copyright (C) Indi.gg LTD - All Rights Reserved', 'https://indi.gg')
    .addServer(serverUrl, 'Target server')
    // .addBearerAuth()
    .addApiKey({
      type: 'apiKey',
      in: 'query',
      name: 'apiKey',
      description: 'Parnter API Key - for application specific calls',
    })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(PORT, () => {
    console.log(`Application is running on port ${PORT}. Url: http://localhost:${PORT}`);
  });
}

void bootstrap();
