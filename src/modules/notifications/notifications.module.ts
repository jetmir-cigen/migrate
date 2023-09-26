import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import {
  EmailNotificationsService,
  NotificationsService,
  PushNotificationsService,
  SmsNotificationsService,
} from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { TextTemplateEntity } from '../text-template/entities';
import { CustomerEntity } from '../customer/entities/customer.entity';
import { HttpModule } from '@nestjs/axios';
import { CostObjectEntity } from '@/common/entities/cost-object.entity';
import { LogSmsPushEntity } from '../phone/entities';
import { LogMailEntity } from './entities/log-mail.entity';

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
})
export class NotificationsModule {}
