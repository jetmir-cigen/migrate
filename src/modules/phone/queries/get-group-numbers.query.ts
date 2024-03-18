import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SmsGroupNumberEntity } from '../entities/sms-group-number.entity';

type QueryFilters = {
  userId: number;
};

export class FindGroupNumbersByFilterQuery {
  constructor(public readonly filters: QueryFilters) {}
}

@QueryHandler(FindGroupNumbersByFilterQuery)
export class FindGroupNumbersByFilterQueryHandler
  implements IQueryHandler<FindGroupNumbersByFilterQuery>
{
  constructor(
    @InjectRepository(SmsGroupNumberEntity)
    private readonly repository: Repository<SmsGroupNumberEntity>,
  ) {}

  async execute({ filters }: FindGroupNumbersByFilterQuery) {
    const { userId } = filters;

    const data = await this.repository
      .createQueryBuilder('sgn')
      .innerJoin('sgn.group', 'sg')
      .where('sg.user_id = :userId', { userId })
      .select(['sgn.id', 'sgn.number', 'sgn.name', 'sg.id', 'sg.name'])
      .getMany();

    return data;
  }
}
