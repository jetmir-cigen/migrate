import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeConsentEntity } from './entities/employee-consent.entity';

export class GetEmployeeConsentsQuery {
  constructor(
    public readonly data: {
      customer: { id: number };
      customerHead: { id: number };
    },
  ) {}
}

@QueryHandler(GetEmployeeConsentsQuery)
export class GetEmployeeConsentsQueryHandler
  implements IQueryHandler<GetEmployeeConsentsQuery>
{
  constructor(
    @InjectRepository(EmployeeConsentEntity)
    private readonly employeeConsentRepository: Repository<EmployeeConsentEntity>,
  ) {}

  async execute({
    data: { customer, customerHead },
  }: GetEmployeeConsentsQuery): Promise<EmployeeConsentEntity[]> {
    const employeeConsents = await this.employeeConsentRepository
      .createQueryBuilder('e')
      .leftJoin('e.employeeConsentCostObjects', 'employeeConsentCostObjects')
      .leftJoin('e.user', 'u')
      .leftJoin('e.customerHead', 'ch')
      .leftJoin('e.customer', 'c')
      .select(['e', 'u.id', 'u.firstName', 'u.lastName', 'ch.id', 'c.id'])
      .where(
        'e.customer_id = :customer OR e.customer_head_id = :customerHead',
        { customer: customer.id, customerHead: customerHead.id },
      )
      .loadRelationCountAndMap(
        'e.consentsGiven',
        'e.employeeConsentCostObjects',
        'consentsGiven',
      )
      .groupBy('e.id')
      .orderBy('e.id', 'DESC')
      .getMany();

    return employeeConsents;
  }
}
