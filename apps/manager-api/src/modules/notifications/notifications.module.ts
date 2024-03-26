import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import {
  EmailNotificationsService,
  NotificationsService,
  PushNotificationsService,
  SmsNotificationsService,
} from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import {
  CostObjectEntity,
  CustomerEntity,
  LogMailEntity,
  LogSmsPushEntity,
  TextTemplateEntity,
  UserEntity,
} from '@skytech/db';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      CostObjectEntity,
      TextTemplateEntity,
      CustomerEntity,
      LogSmsPushEntity,
      LogMailEntity,
    ]),
    HttpModule,
  ],
  controllers: [NotificationsController],
  providers: [
    NotificationsService,
    EmailNotificationsService,
    SmsNotificationsService,
    PushNotificationsService,
  ],
  exports: [
    TypeOrmModule.forFeature([
      UserEntity,
      CostObjectEntity,
      TextTemplateEntity,
      CustomerEntity,
      LogSmsPushEntity,
      LogMailEntity,
    ]),
    NotificationsService,
    EmailNotificationsService,
    SmsNotificationsService,
    PushNotificationsService,
  ],
})
export class NotificationsModule {}
