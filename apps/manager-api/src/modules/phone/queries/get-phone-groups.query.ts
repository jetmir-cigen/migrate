import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { SmsGroupEntity } from '@skytech/db';
import { Repository } from 'typeorm';

type QueryFilters = {
  userId: number;
};

export class FindPhoneGroupsByFilterQuery {
  constructor(public readonly filters: QueryFilters) {}
}

@QueryHandler(FindPhoneGroupsByFilterQuery)
export class FindPhoneGroupsByFilterQueryHandler
  implements IQueryHandler<FindPhoneGroupsByFilterQuery>
{
  constructor(
    @InjectRepository(SmsGroupEntity)
    private readonly repository: Repository<SmsGroupEntity>,
  ) {}

  async execute({ filters }: FindPhoneGroupsByFilterQuery) {
    const { userId } = filters;

    const data = await this.repository
      .createQueryBuilder('groups')
      .where('groups.userId = :userId', { userId })
      .getMany();

    return data;
  }
}
