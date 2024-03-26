import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsModule } from '../notifications/notifications.module';
import { CreateSubscriptionOrderCommandHandler } from './commands/create-service-order.command';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import {
  CustomerDealerEntity,
  CustomerEntity,
  DealerNotificationEmailEntity,
  SubscriptionServiceOrderActivationEntity,
  SubscriptionServiceOrdersEntity,
  SubscriptionServicesEntity,
  UserEntity,
} from '@skytech/db';

@Module({
  imports: [
    CqrsModule,
    HttpModule,
    NotificationsModule,
    TypeOrmModule.forFeature([
      UserEntity,
      CustomerEntity,
      CustomerDealerEntity,
      DealerNotificationEmailEntity,
      SubscriptionServiceOrderActivationEntity,
      SubscriptionServiceOrdersEntity,
      SubscriptionServicesEntity,
    ]),
  ],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, CreateSubscriptionOrderCommandHandler],
})
export class SubscriptionsModule {}
