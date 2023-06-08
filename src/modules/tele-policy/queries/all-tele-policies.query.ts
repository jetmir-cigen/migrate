import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalaryDeductionProfileEntity } from '../entities/salary-deduction-profile.entity';

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
    private readonly invoiceRepository: Repository<SalaryDeductionProfileEntity>,
  ) {}

  async execute({ filters }: FindTelePoliciesByFilterQuery) {
    const { customerHeadId, userId } = filters;

    console.log({ customerHeadId, userId });

    const telePolicies = this.invoiceRepository
      .createQueryBuilder('tp')
      .orWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select('mac.customer_id')
          .from('view.manager_access_customer', 'mac')
          .where('mac.user_id = :userId', { userId })
          .getQuery();
        return 'tp.customerId IN ' + subQuery;
      })
      .leftJoinAndSelect('tp.telePolicyTemplate', 'tpt');

    if (customerHeadId) {
      telePolicies.orWhere('tp.customer_head_id = :customerHeadId', {
        customerHeadId,
      });
    }

    return telePolicies.getMany();
  }
}
