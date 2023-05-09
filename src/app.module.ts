import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MailerModule as NestJsMailerModule } from '@nestjs-modules/mailer';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DepartmentModule } from './modules/department/department.module';
import {
  configValidationSchema,
  typeOrmAsyncConfig,
  mailerAsyncConfig,
} from './config';
import { ElementLabelModule } from './modules/element-label/element-label.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthMiddleware } from './modules/auth/auth.middleware';
import { UserModule } from './modules/user/user.module';
import { CustomerModule } from './modules/customer/customer.module';
import { MailerModule } from './modules/mailer/mailer.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { TextTemplateModule } from './modules/text-template/text-template.module';
import { EmployeeConsentModule } from './modules/admin/employee-consent/employee-consent.module';
import { CustomerHeadModule } from './modules/customer-head/customer-head.module';
import { EmployeeConsentCostObjectModule } from './modules/admin/employee-consent-cost-object/employee-consent-cost-object.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    NestJsMailerModule.forRootAsync(mailerAsyncConfig),
    DepartmentModule,
    ElementLabelModule,
    AuthModule,
    UserModule,
    CustomerModule,
    CustomerHeadModule,
    MailerModule,
    InvoiceModule,
    TextTemplateModule,
    EmployeeConsentModule,
    EmployeeConsentCostObjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
