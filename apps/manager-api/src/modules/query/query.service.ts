import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { QueryInterface } from '@skytech/manager/common/query.interface';

/**
 * Simple, thin wrapper around `QueryBus` to infer query return type from
 * ones that implement custom `QueryInterface`.
 */
@Injectable()
export class QueryService {
  constructor(private readonly queryBus: QueryBus) {}

  execute<Query extends QueryInterface>(
    query: Query,
  ): Promise<Query['$$resolveType']> {
    return this.queryBus.execute(query);
  }
}
