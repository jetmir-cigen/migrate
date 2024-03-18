import { CostObjectEntity } from '@skytech/manager/common/entities/cost-object.entity';
import { ActiveMobileUserView } from '@skytech/manager/common/views/active-mobile-users.view';
import { ManagerAccessDepartmentView } from '@skytech/manager/common/views/manager-access-department.view';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

type QueryFilters = {
  userId: number;
};

export class FindActiveNumbersByFilterQuery {
  constructor(public readonly filters: QueryFilters) {}
}

@QueryHandler(FindActiveNumbersByFilterQuery)
export class FindActiveNumbersByFilterQueryHandler
  implements IQueryHandler<FindActiveNumbersByFilterQuery>
{
  constructor(
    @InjectRepository(CostObjectEntity)
    private readonly repository: Repository<CostObjectEntity>,
  ) {}

  async execute({ filters }: FindActiveNumbersByFilterQuery) {
    const { userId } = filters;

    const data = await this.repository
      .createQueryBuilder('co')
      .leftJoin('co.department', 'department')
      .leftJoin('co.salaryDeductionProfile', 'sdf')
      .innerJoin(ActiveMobileUserView, 'amu', 'amu.id = co.id')
      .innerJoin(
        ManagerAccessDepartmentView,
        'mac',
        'mac.department_id = amu.department_id',
      )
      .leftJoinAndSelect(
        'co.phoneBook',
        'phoneBook',
        'phoneBook.user_id = :userId',
        { userId },
      )
      .where('mac.user_id = :userId', { userId })
      // And where co.code and co.name is not null
      .andWhere('co.code IS NOT NULL')
      .andWhere('co.name IS NOT NULL')
      .select([
        'co.id',
        'co.code',
        'co.name',
        'co.customerId',
        'phoneBook.id',
        'phoneBook.user_id',
        'phoneBook.country_id',
        'phoneBook.phone_number',
        'phoneBook.name',
        'department.id',
        'department.name',
        'sdf.id',
        'sdf.name',
      ])
      .getMany();

    return data;
  }
}
