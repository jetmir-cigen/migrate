import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IUser } from '@skytech/auth';
import {
  DepartmentEntity,
  ManagerAccessCustomerView,
  ManagerAccessDepartmentView,
  SalaryDeductionProfileEntity,
} from '@skytech/db';

type QueryFilters = {
  user: IUser;
};

export class FindPhoneBooksByFilterQuery {
  constructor(public readonly filters: QueryFilters) {}
}

@QueryHandler(FindPhoneBooksByFilterQuery)
export class FindPhoneBooksByFilterQueryHandler
  implements IQueryHandler<FindPhoneBooksByFilterQuery>
{
  constructor(
    @InjectRepository(DepartmentEntity)
    private readonly dRepository: Repository<DepartmentEntity>,
    @InjectRepository(SalaryDeductionProfileEntity)
    private readonly sRepository: Repository<SalaryDeductionProfileEntity>,
  ) {}

  async execute({ filters }: FindPhoneBooksByFilterQuery) {
    const { user } = filters;

    const dPromise = this.dRepository
      .createQueryBuilder('department')
      .innerJoin(
        ManagerAccessDepartmentView,
        'mac',
        'mac.department_id = department.id',
      )
      .innerJoin('department.costObjects', 'costObjects')
      .where('mac.user_id = :userId', { userId: user.uid })
      .andWhere('department.customer_id = :customerId', {
        customerId: user.cid,
      })
      .select(['department.id', 'department.name'])
      .orderBy('department.name', 'ASC')
      .getMany();

    const tPromise = this.sRepository
      .createQueryBuilder('sdp')
      .innerJoin(
        ManagerAccessCustomerView,
        'mac',
        'mac.customer_id = sdp.customerId',
      )
      .innerJoin('sdp.costObjects', 'co')
      .where('mac.user_id = :userId', { userId: user.uid })
      .select(['sdp.id', 'sdp.name'])
      .orderBy('sdp.name', 'ASC')
      .getMany();

    const [departments, telePolicies] = await Promise.all([dPromise, tPromise]);

    return {
      departments,
      telePolicies,
    };
  }
}
