import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import cookieParser from 'cookie-parser';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.use(cookieParser());

  const globalPrefix = 'api/v1';
  app.setGlobalPrefix(globalPrefix);

  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3000', /.+vercel\.app/, /.+skytechcontrol\.io/],
    allowedHeaders: [
      'authorization',
      'cookie',
      'cookies',
      'content-type',
      'baggage',
      'sentry-trace',
    ],
  });

  //For custom validations
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const config = new DocumentBuilder()
    .setTitle('Manager API')
    .setDescription('The manager API description')
    .setVersion('1.0')
    .addTag('manager')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('app api docs', app, document);

  const PORT = process.env.APP_PORT || 4001;
  await app.listen(PORT);
  Logger.log(
    `🚀 App api is running on: http://localhost:${PORT}/${globalPrefix}`,
  );
}

bootstrap();
