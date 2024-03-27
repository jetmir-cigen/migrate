import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SalaryDeductionProfileEntity } from '@skytech/db';

type QueryFilters = {
  customerHeadId: number;
  userId: number;
};

export class FindTelePoliciesByFilterQuery {
  constructor(public readonly filters: QueryFilters) {}
}

@QueryHandler(FindTelePoliciesByFilterQuery)
export class FindTelePoliciesByFilterQueryHandler
  implements IQueryHandler<FindTelePoliciesByFilterQuery>
{
  constructor(
    @InjectRepository(SalaryDeductionProfileEntity)
    private readonly repository: Repository<SalaryDeductionProfileEntity>,
  ) {}

  async execute({ filters }: FindTelePoliciesByFilterQuery) {
    const { customerHeadId, userId } = filters;

    const telePolicies = this.repository
      .createQueryBuilder('sdp')
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select('mac.customer_id')
          .from('view.manager_access_customer', 'mac')
          .where('mac.user_id = :userId', { userId })
          .getQuery();
        return 'sdp.customerId IN ' + subQuery;
      })
      .leftJoinAndSelect('sdp.telePolicyTemplate', 'sdpt')
      .leftJoinAndSelect('sdp.customer', 'c')
      .leftJoinAndSelect('c.country', 'cc')
      .leftJoinAndSelect('sdp.customerHead', 'ch')
      .leftJoinAndSelect('ch.corporateCustomer', 'chc')
      .leftJoinAndSelect('chc.country', 'chcc')
      .loadRelationCountAndMap(
        'sdp.subscribers',
        'sdp.costObjects',
        'subscribers',
      )
      .select([
        'sdp.id',
        'sdp.name',
        'sdp.comment',
        'sdp.freeAllowanceAmount',
        'sdpt.id',
        'sdpt.name',
        'c.id',
        'c.name',
        'cc.id',
        'cc.name',
        'cc.currency',
        'ch.id',
        'ch.name',
        'chc.id',
        'chc.name',
        'chcc.id',
        'chcc.name',
        'chcc.currency',
      ]);

    if (customerHeadId) {
      telePolicies.orWhere('sdp.customer_head_id = :customerHeadId', {
        customerHeadId,
      });
    }

    return telePolicies.getMany();
  }
}
