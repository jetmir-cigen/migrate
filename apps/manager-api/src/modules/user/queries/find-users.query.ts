import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';

import { UserEntity } from '@skytech/manager/modules/user/entities/user.entity';
import { SalaryDeductionProfileEntity } from '@skytech/manager/modules/tele-policy/entities/salary-deduction-profile.entity';

type QueryFilters = {
  customerHeadId: number;
  userId: number;
};

export class FindUsersByFilterQuery {
  constructor(public readonly filters: QueryFilters) {}
}

@QueryHandler(FindUsersByFilterQuery)
export class FindUsersByFilterQueryHandler
  implements IQueryHandler<FindUsersByFilterQuery>
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async execute({ filters }: FindUsersByFilterQuery) {
    const { userId } = filters;
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userGroup', 'userGroup')
      .where('user.inactive != true')
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
              return 'user.customerId IN ' + subQuery;
            },
          );
        }),
      )
      .select([
        'user.id',
        'user.username',
        'user.seller',
        'user.firstName',
        'user.lastName',
        'user.email',
        'user.phoneNumber',
        'userGroup.id',
        'userGroup.description',
        'userGroup.name',
      ])
      .getMany();
  }
}
