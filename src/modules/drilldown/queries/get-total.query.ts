import {
  QueryHandlerInterface,
  QueryInterface,
} from '@/common/query.interface';
import { QueryHandler } from '@nestjs/cqrs';

type QueryFilters = {
  year: number;
  period: number;
};

export class GetTotalQuery implements QueryInterface {
  $$resolveType: any;

  constructor(public readonly filters: QueryFilters) {}
}

@QueryHandler(GetTotalQuery)
export class GetTotalQueryHandler
  implements QueryHandlerInterface<GetTotalQuery>
{
  async execute({ filters }: GetTotalQuery) {
    return {};
  }
}
