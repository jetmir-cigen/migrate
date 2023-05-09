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
    public readonly filters: QueryFilters,
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

  async execute({ filters, pagination }: FindUsersByFilterQuery) {
    const whereFilters = [];
    const { username, name, seller } = filters;
    const { items = 20 } = pagination || {};
    if (username) {
      whereFilters.push({ username });
    }
    if (name) {
      whereFilters.push({ firstName: name }, { lastName: name });
    }
    if (seller) {
      whereFilters.push({ seller });
    }
    const [users, total] = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.usergroup', 'usergroup')
      .where(whereFilters)
      .select([
        'user.id',
        'user.username',
        'user.seller',
        'user.firstName',
        'user.lastName',
        'user.email',
        'usergroup.name',
      ])
      .getManyAndCount();

    return [users, total] as [UserEntity[], number];
  }
}
