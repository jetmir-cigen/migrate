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
    const where = [];
    const { username, name, seller } = filters;
    const { items = 20 } = pagination || {};
    if (username) {
      where.push({ username });
    }
    if (name) {
      where.push({ firstName: name }, { lastName: name });
    }
    if (seller) {
      where.push({ seller });
    }
    const [users, total] = await this.userRepository.findAndCount({
      where: where.length ? where : undefined,
      take: items,
      select: ['username', 'email', 'seller', 'firstName', 'lastName'],
    });

    return [users, total] as [UserEntity[], number];
  }
}
