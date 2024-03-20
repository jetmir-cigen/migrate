import { Module } from '@nestjs/common';
import { TerminationsService } from './terminations.service';
import { TerminationsController } from './terminations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionServiceOrdersEntity } from '../subscriptions/entities/subscription-service-orders.entity';
import { DepartmentEntity } from '../department/entities/department.entity';
import { SubscriptionServiceOrderTerminationEntity } from './entity/subscription-service-order-termination.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { HttpModule } from '@nestjs/axios';
import { GetAllTerminationsQueryHandler } from './queries/get-all-terminations.query';
import { GetTerminationByIdQueryHandler } from './queries/get-termination-by-id';

@Module({
  imports: [
    CqrsModule,
    HttpModule,
    TypeOrmModule.forFeature([
      DepartmentEntity,
      SubscriptionServiceOrdersEntity,
      SubscriptionServiceOrderTerminationEntity,
    ]),
  ],
  controllers: [TerminationsController],
  providers: [
    TerminationsService,
    GetAllTerminationsQueryHandler,
    GetTerminationByIdQueryHandler,
  ],
})
export class TerminationsModule {}
