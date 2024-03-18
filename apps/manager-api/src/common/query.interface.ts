import { IQueryHandler } from '@nestjs/cqrs';

export interface QueryInterface {
  $$resolveType: any;
}

export type QueryHandlerInterface<Query extends QueryInterface> = IQueryHandler<
  Query,
  Query['$$resolveType']
>;
