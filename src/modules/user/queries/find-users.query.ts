import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '@/modules/user/entities/user.entity';

type QueryFilters = {
  username?: string;
  name?: string;
  type?: string;
  email?: string;
  seller?: boolean;
};

export class FindUsersByFilterQuery {
  constructor(
    public readonly filters?: QueryFilters,
    public readonly pagination?: { items: number },
  ) {}
}

@QueryHandler(FindUsersByFilterQuery)
export class FindUsersByFilterQueryHandler
  implements IQueryHandler<FindUsersByFilterQuery>
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async execute() {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userGroup', 'userGroup')
      .where('user.inactive != true')
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
      ])
      .getMany();
  }
}
