import { QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { QueryHandlerInterface, QueryInterface } from '@skytech/common';
import { SubscriptionServiceOrderActivationEntity } from '@skytech/db';

import { QueryFilter } from '.';

export class NewNumberOrdersReportQuery implements QueryInterface {
  $$resolveType: any;

  constructor(public readonly filters: QueryFilter) {}
}

@QueryHandler(NewNumberOrdersReportQuery)
export class NewNumberOrdersReportQueryHandler
  implements QueryHandlerInterface<NewNumberOrdersReportQuery>
{
  constructor(
    @InjectRepository(SubscriptionServiceOrderActivationEntity)
    private readonly repository: Repository<SubscriptionServiceOrderActivationEntity>,
  ) {}

  async execute({ filters }: NewNumberOrdersReportQuery): Promise<any> {
    const { customerHeadId, customerId, fromDate, toDate, isGlobal } = filters;

    const query = this.repository
      .createQueryBuilder('subscriptionServiceOrderActivation')
      .innerJoinAndSelect(
        'subscriptionServiceOrderActivation.subscriptionServiceOrders',
        'subscriptionServiceOrders',
      )
      .innerJoinAndSelect(
        'subscriptionServiceOrders.subscriptionService',
        'subscriptionService',
      )
      .innerJoinAndSelect(
        'subscriptionServiceOrderActivation.department',
        'department',
      )
      .leftJoinAndSelect(
        'subscriptionServiceOrderActivation.salaryDeductionProfile',
        'salaryDeductionProfile',
      )
      .leftJoinAndSelect(
        'subscriptionServiceOrderActivation.devicePolicy',
        'devicePolicy',
      )
      .select([
        'subscriptionService.id',
        'subscriptionService.name',
        'subscriptionServiceOrders.id',
        'subscriptionServiceOrders.comment',
        'subscriptionServiceOrderActivation.id',
        'subscriptionServiceOrderActivation.email',
        'subscriptionServiceOrderActivation.simName',
        'subscriptionServiceOrderActivation.contactNumber',
        'subscriptionServiceOrderActivation.activationDate',
        'department.id',
        'department.name',
        'salaryDeductionProfile.id',
        'salaryDeductionProfile.name',
        'devicePolicy.id',
        'devicePolicy.name',
      ])
      .where('subscriptionServiceOrderActivation.activationDate >= :fromDate', {
        fromDate,
      })
      .andWhere(
        'subscriptionServiceOrderActivation.activationDate <= :toDate',
        {
          toDate,
        },
      )
      .andWhere('subscriptionServiceOrderActivation.newNumber = 1');

    if (isGlobal) {
      query.andWhere('subscriptionService.customerHeadId = :customerHeadId', {
        customerHeadId,
      });
    } else {
      query.andWhere('subscriptionService.customerId = :customerId', {
        customerId,
      });
    }

    return await query.getMany();
  }
}
