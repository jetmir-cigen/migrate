import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SmsGroupEntity } from '../entities/sms-group.entity';

type QueryFilters = {
  userId: number;
  id: number;
};

export class FindPhoneGroupByFilterQuery {
  constructor(public readonly filters: QueryFilters) {}
}

@QueryHandler(FindPhoneGroupByFilterQuery)
export class FindPhoneGroupByFilterQueryHandler
  implements IQueryHandler<FindPhoneGroupByFilterQuery>
{
  constructor(
    @InjectRepository(SmsGroupEntity)
    private readonly repository: Repository<SmsGroupEntity>,
  ) {}

  async execute({ filters }: FindPhoneGroupByFilterQuery) {
    const { userId, id } = filters;

    const data = await this.repository
      .createQueryBuilder('groups')
      .where('groups.userId = :userId', { userId })
      .andWhere('groups.id = :id', { id })
      .getOneOrFail();

    return data;
  }
}
