import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { LogSmsPushEntity } from '../entities/log-sms-push.entity';
import { ManagerAccessCustomerView } from '@skytech/manager/common/views/manager-access-customer.view';
import { QueryInterface } from '@skytech/manager/common/query.interface';
import { IUser } from '@skytech/auth';

type QueryFilters = {
  user: IUser;
};

export class GetSMSLogsByFilterQuery implements QueryInterface {
  $$resolveType: LogSmsPushEntity[];

  constructor(public readonly filters: QueryFilters) {}
}

@QueryHandler(GetSMSLogsByFilterQuery)
export class GetSMSLogsByFilterQueryHandler
  implements IQueryHandler<GetSMSLogsByFilterQuery>
{
  constructor(
    @InjectRepository(LogSmsPushEntity)
    private readonly repository: Repository<LogSmsPushEntity>,
  ) {}

  async execute({ filters }: GetSMSLogsByFilterQuery) {
    const { user } = filters;

    const data = await this.repository
      .createQueryBuilder('logs')
      .where('logs.batchId IS NOT NULL')
      .innerJoin(
        ManagerAccessCustomerView,
        'access',
        'access.customer_id = logs.customerId',
      )
      .andWhere('access.user_id = :userId', { userId: user.uid })
      .andWhere(
        new Brackets((qb) => {
          qb.where('logs.isPrivate = 1 AND logs.userId = :userId', {
            userId: user.uid,
          }).orWhere('logs.isPrivate = 0');
        }),
      )
      // .addSelect('COUNT(logs.id)', 'logs_receivers')
      .addSelect('COUNT(DISTINCT logs.id)', 'logs_receivers')
      .groupBy('logs.batchId')
      .orderBy('logs.sent', 'DESC')
      .getMany();

    return data;
  }
}
