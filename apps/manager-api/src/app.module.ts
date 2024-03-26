import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule as NestJsMailerModule } from '@nestjs-modules/mailer';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DepartmentModule } from './modules/department/department.module';
import { mailerAsyncConfig, config } from './config';
import { ElementLabelModule } from './modules/element-label/element-label.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CustomerModule } from './modules/customer/customer.module';
import { MailerModule } from './modules/mailer/mailer.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { TextTemplateModule } from './modules/text-template/text-template.module';
import { EmployeeConsentModule } from './modules/employee-consent/employee-consent.module';
import { WhitelabelModule } from './modules/whitelabel/whitelabel.module';
import { TelePolicyModule } from './modules/tele-policy/tele-policy.module';
import { ReportModule } from './modules/report/report.module';
import { PhoneModule } from './modules/phone/phone.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { AssetModule } from './modules/asset/asset.module';
import { DrillDownModule } from './modules/drilldown/drilldown.module';
import { QueryModule } from './modules/query/query.module';
import { CustomerAddressModule } from './modules/customer-address/customer-address.module';
import { PolicyModule } from './modules/policy/policy.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import {
  AuthModule as GlobalAuthModule,
  AuthMiddlewareMixin,
} from '@skytech/auth';
import { DbModule } from '@skytech/db';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    DbModule,
    NestJsMailerModule.forRootAsync(mailerAsyncConfig),
    DepartmentModule,
    ElementLabelModule,
    GlobalAuthModule,
    AuthModule,
    UserModule,
    CustomerModule,
    MailerModule,
    InvoiceModule,
    TextTemplateModule,
    EmployeeConsentModule,
    WhitelabelModule,
    InvoiceModule,
    TelePolicyModule,
    ReportModule,
    PhoneModule,
    NotificationsModule,
    AssetModule,
    DrillDownModule,
    QueryModule,
    CustomerAddressModule,
    PolicyModule,
    SubscriptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    const authTokenName = this.configService.get('auth.managerAuthToken');

    consumer
      .apply(AuthMiddlewareMixin(authTokenName))
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}