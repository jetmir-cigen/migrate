import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Brackets,
  EntityNotFoundError,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { SalaryDeductionProfileEntity } from '../entities/salary-deduction-profile.entity';
import { NotFoundException } from '@nestjs/common';

type QueryFilters = {
  customerHeadId: number;
  userId: number;
  id: number;
};

export class GetTelePolicyByFilterQuery {
  constructor(public readonly filters: QueryFilters) {}
}

@QueryHandler(GetTelePolicyByFilterQuery)
export class GetTelePolicyByFilterQueryHandler
  implements IQueryHandler<GetTelePolicyByFilterQuery>
{
  constructor(
    @InjectRepository(SalaryDeductionProfileEntity)
    private readonly invoiceRepository: Repository<SalaryDeductionProfileEntity>,
  ) {}

  async execute({ filters }: GetTelePolicyByFilterQuery) {
    const { customerHeadId, userId, id } = filters;

    try {
      const telePolicies = this.invoiceRepository
        .createQueryBuilder('tp')
        .where('tp.id = :id', { id })
        .andWhere(
          new Brackets((qb) => {
            qb.andWhere(
              (sqb: SelectQueryBuilder<SalaryDeductionProfileEntity>) => {
                const subQuery = sqb
                  .subQuery()
                  .select('mac.customer_id')
                  .from('view.manager_access_customer', 'mac')
                  .where('mac.user_id = :userId', { userId })
                  .getQuery();
                return 'tp.customerId IN ' + subQuery;
              },
            ).orWhere('tp.customer_head_id = :customerHeadId', {
              customerHeadId,
            });
          }),
        );

      const result = await telePolicies.getOneOrFail();

      return result;
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundException(`Tele policy with ID ${id} not found`);
      }
      throw err;
    }
  }
}
