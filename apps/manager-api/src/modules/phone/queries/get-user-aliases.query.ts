import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUser } from '@skytech/auth';
import { UserAliasEntity, UserEntity } from '@skytech/db';

type QueryFilters = {
  user: IUser;
};

export class FindUserAliasesByFilterQuery {
  constructor(public readonly filters: QueryFilters) {}
}

@QueryHandler(FindUserAliasesByFilterQuery)
export class FindUserAliasesByFilterQueryHandler
  implements IQueryHandler<FindUserAliasesByFilterQuery>
{
  constructor(
    @InjectRepository(UserAliasEntity)
    private readonly repository: Repository<UserAliasEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async execute({ filters }: FindUserAliasesByFilterQuery) {
    const { user } = filters;

    const authUser = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.customer', 'customer')
      .where('user.id = :id', { id: user.uid })
      .select([
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.username',
        'user.phoneNumber',
        'customer.name',
      ])
      .getOne();

    const userAlias = await this.repository
      .createQueryBuilder('alias')
      .where('alias.user_id = :id', { id: user.uid })
      .select(['alias.alias'])
      .getMany();

    const aliases = [
      {
        label: (authUser.firstName + ' ' + authUser.lastName).trim(),
        value: (authUser.firstName + ' ' + authUser.lastName).trim(),
      },
      {
        label: authUser.username,
        value: authUser.username,
      },
      {
        label: authUser.phoneNumber,
        value: authUser.phoneNumber,
      },
      {
        label: authUser.customer.name,
        value: authUser.customer.name,
      },
    ];

    userAlias.forEach((alias) => {
      aliases.push({
        label: alias.alias,
        value: alias.alias,
      });
    });

    return aliases;
  }
}
