import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SmsGroupEntity } from '../entities/sms-group.entity';
import { SmsGroupNumberEntity } from '../entities/sms-group-number.entity';

type QueryFilters = {
  userId: number;
  id: number;
};

export class FindPhoneGroupNumbersByFilterQuery {
  constructor(public readonly filters: QueryFilters) {}
}

@QueryHandler(FindPhoneGroupNumbersByFilterQuery)
export class FindPhoneGroupNumbersByFilterQueryHandler
  implements IQueryHandler<FindPhoneGroupNumbersByFilterQuery>
{
  constructor(
    @InjectRepository(SmsGroupEntity)
    private readonly repository: Repository<SmsGroupEntity>,
    @InjectRepository(SmsGroupNumberEntity)
    private readonly numbersRepository: Repository<SmsGroupNumberEntity>,
  ) {}

  async execute({ filters }: FindPhoneGroupNumbersByFilterQuery) {
    const { userId, id } = filters;

    const data = await this.repository
      .createQueryBuilder('groups')
      .where('groups.userId = :userId', { userId })
      .andWhere('groups.id = :id', { id })
      .getOneOrFail();

    const numbers = await this.numbersRepository
      .createQueryBuilder('numbers')
      .where('numbers.groupId = :id', { id: data.id })
      .getMany();

    return numbers;
  }
}
