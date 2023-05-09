import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  app.use(cookieParser());
  app.setGlobalPrefix('api/v1');
  // Enable cors, so FE can access it.
  app.enableCors({
    // credentials: true,
    // origin: ['http://localhost:3000'],
    // allowedHeaders: ['authorization', 'cookie', 'cookies', 'content-type'],
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
  SwaggerModule.setup('docs', app, document);

  await app.listen(3001);
  console.log(
    `Application running at ${(await app.getUrl()).replace(
      '[::1]',
      'localhost',
    )}`,
  );
}
bootstrap();
