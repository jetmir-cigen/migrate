import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from '../customer/entities/customer.entity';
import { NotificationsModule } from '../notifications/notifications.module';
import { UserEntity } from '../user/entities/user.entity';
import { CreateSubscriptionOrderCommandHandler } from './commands/create-subscription-order.command';
import { DealerNotificationEmailEntity } from './entities/dealer-notification-email.entity';
import { SubscriptionServiceOrderActivationEntity } from './entities/subscription-service-order-activation.entity';
import { SubscriptionServiceOrdersEntity } from './entities/subscription-service-orders.entity';
import { SubscriptionServicesEntity } from './entities/subscription-services.entity';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import { CustomerDealerEntity } from './entities/customer-dealer.entity';
import { GetAllSubscriptsionsQueryHandler } from './queries/get-all-subscriptions.query';
import { DepartmentEntity } from '../department/entities/department.entity';
import { GetSubscriptionByIdQueryHandler } from './queries/get-subscription-by-id';
import { UpdateSubscriptionCommandHandler } from './commands/update-subscription-order';

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
      DepartmentEntity,
    ]),
  ],
  controllers: [SubscriptionsController],
  providers: [
    SubscriptionsService,
    CreateSubscriptionOrderCommandHandler,
    GetAllSubscriptsionsQueryHandler,
    GetSubscriptionByIdQueryHandler,
    UpdateSubscriptionCommandHandler,
  ],
})
export class SubscriptionsModule {}
