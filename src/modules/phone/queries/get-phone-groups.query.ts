import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SmsGroupEntity } from '../entities/sms-group.entity';

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
