import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';
import { useContainer } from 'class-validator';
import { UserRolesENUM } from './modules/user/user-roles.enum';

declare global {
  enum UserRoles {
    ADMIN = 'admin',
    CUSTOMER_HEAD_ADMIN = 'customer_head_admin',
    CUSTOMER_ADMIN = 'customer_admin',
    DEPARTMENT_HEAD = 'department_head',
    DEPARTMENT_HEAD_CORP = 'department_head_corp',
    MOBILE_USER = 'mobile_user',
    SELLER = 'seller',
    MANAGEMENT = 'management',
    DEALER = 'dealer',
    REPORT_USER = 'report_user',
    IT_USER = 'it_user',
    FINANCING_AGENT = 'financing_agent',
  }

  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface GenericUser {
      uid: number;
      cid: number;
      chid: number;
      wlid: number;
      role: UserRolesENUM;
    }

    interface RegularUser extends GenericUser {
      id: number;
      role: UserRolesENUM.IT_USER;
    }
    interface ManagerUser extends GenericUser {
      id: number;
      role: UserRolesENUM.MANAGEMENT;
    }
    interface AdminUser extends GenericUser {
      id: number;
      role: UserRolesENUM.ADMIN;
    }
    interface CustomerAdminUser extends GenericUser {
      id: number;
      role: UserRolesENUM.CUSTOMER_ADMIN;
    }

    type User = RegularUser | ManagerUser | AdminUser | CustomerAdminUser;

    type AuthUser = {
      iss: string;
      aud: string;
      uid: number;
      coid: number;
      cid: number;
      chid: number;
      wlid: number;
      role: 'admin' | 'manager' | 'user' | 'customer_admin';
      iom: false;
      iat: number;
      exp: number;
    };

    interface AuthToken {
      jwt: string;
      expiresAt: Date;
    }

    interface Request {
      authToken?: AuthToken | null;
      user?: User;
    }
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
