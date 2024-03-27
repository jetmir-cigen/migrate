import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  CostObjectEntity,
  CustomerEntity,
  LogMailEntity,
  LogSmsPushEntity,
  TextTemplateEntity,
  UserEntity,
} from '@skytech/db';

import { NotificationsController } from './notifications.controller';
import {
  EmailNotificationsService,
  NotificationsService,
  PushNotificationsService,
  SmsNotificationsService,
} from './services';

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
