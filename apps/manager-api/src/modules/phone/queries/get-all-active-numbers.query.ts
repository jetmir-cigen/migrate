import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CostObjectEntity } from '@skytech/db';

import { findAllActiveNumbersQuery } from './queries';

type QueryFilters = {
  userId: number;
};

export interface FindAllActiveNumbersByFilterQueryResult {
  id: number;
  name: string;
  country_id: number;
  phone_number: string;
  full_phone_number: string;
  department_id?: number;
  department_name?: string;
  salary_deduction_profile_id?: number;
  salary_deduction_profile_name?: string;
  is_on_phone_book: 'NO' | 'YES';
  group_id?: number;
  group_name?: string;
}

export class FindAllActiveNumbersByFilterQuery {
  constructor(public readonly filters: QueryFilters) {}
}

@QueryHandler(FindAllActiveNumbersByFilterQuery)
export class FindAllActiveNumbersByFilterQueryHandler
  implements IQueryHandler<FindAllActiveNumbersByFilterQuery>
{
  constructor(
    @InjectRepository(CostObjectEntity)
    private readonly repository: Repository<CostObjectEntity>,
  ) {}

  async execute({ filters }: FindAllActiveNumbersByFilterQuery) {
    const { userId } = filters;

    const data = await this.repository.query(findAllActiveNumbersQuery, [
      userId,
      userId,
      userId,
    ]);

    return data as FindAllActiveNumbersByFilterQueryResult[];
  }
}
