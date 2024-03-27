import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import cookieParser from 'cookie-parser';

import { IUser } from '@skytech/auth';

import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';

declare global {
  interface AuthToken {
    jwt: string;
    expiresAt: Date;
  }

  interface Request {
    authToken?: AuthToken | null;
    user?: IUser;
  }
}

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
  SwaggerModule.setup('docs', app, document);

  const PORT = process.env.PORT || 4000;

  await app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
bootstrap();
