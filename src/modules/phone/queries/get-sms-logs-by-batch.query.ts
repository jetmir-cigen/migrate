import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { LogSmsPushEntity } from '../entities/log-sms-push.entity';
import { ManagerAccessCustomerView } from '@/common/views/manager-access-customer.view';

type QueryFilters = {
  user: Express.User;
  batchId: string;
};

export class GetSMSLogsByBatchFilterQuery {
  constructor(public readonly filters: QueryFilters) {}
}

@QueryHandler(GetSMSLogsByBatchFilterQuery)
export class GetSMSLogsByBatchFilterQueryHandler
  implements IQueryHandler<GetSMSLogsByBatchFilterQuery>
{
  constructor(
    @InjectRepository(LogSmsPushEntity)
    private readonly repository: Repository<LogSmsPushEntity>,
  ) {}

  async execute({ filters }: GetSMSLogsByBatchFilterQuery) {
    const { user, batchId } = filters;

    const data = await this.repository
      .createQueryBuilder('logs')
      .leftJoin(
        ManagerAccessCustomerView,
        'mac',
        'mac.customer_id = logs.customerId',
      )
      .where('logs.batchId = :batchId', { batchId })
      .andWhere('mac.userId = :userId', { userId: user.uid })
      .andWhere(
        new Brackets((qb) => {
          qb.where('logs.isPrivate = 1 AND logs.userId = :userId', {
            userId: user.uid,
          }).orWhere('logs.isPrivate = 0');
        }),
      )
      .getMany();

    return data;
  }
}
