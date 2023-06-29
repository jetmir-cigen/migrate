import {
  QueryHandlerInterface,
  QueryInterface,
} from '@/common/query.interface';
import { DataSource } from 'typeorm';
import { QueryHandler } from '@nestjs/cqrs';

import { groupByOrder } from './query';
import { QueryFilter } from '.';

export class ReportGroupByOrderQuery implements QueryInterface {
  $$resolveType: any;

  constructor(public readonly filters: QueryFilter) {}
}

@QueryHandler(ReportGroupByOrderQuery)
export class ReportGroupByOrderQueryHandler
  implements QueryHandlerInterface<ReportGroupByOrderQuery>
{
  constructor(private dataSource: DataSource) {}

  async execute({ filters }: ReportGroupByOrderQuery): Promise<any> {
    const { customerHeadId, customerId, fromDate, toDate } = filters;

    return this.dataSource.query(groupByOrder, [
      customerId,
      customerHeadId,
      fromDate,
      toDate,
      customerId,
      customerHeadId,
      fromDate,
      toDate,
    ]);
  }
}
