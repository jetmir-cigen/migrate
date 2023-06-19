import {
  QueryHandlerInterface,
  QueryInterface,
} from '@/common/query.interface';
import { DataSource } from 'typeorm';
import { QueryHandler } from '@nestjs/cqrs';

import { groupByOrder } from './query';

export class ReportGroupByOrderQuery implements QueryInterface {
  $$resolveType: any;

  constructor(
    public readonly customerId: number,
    public readonly customerHeadId: number,
    public readonly fromDate: string,
    public readonly toDate: string,
  ) {}
}

@QueryHandler(ReportGroupByOrderQuery)
export class ReportGroupByOrderQueryHandler
  implements QueryHandlerInterface<ReportGroupByOrderQuery>
{
  constructor(private dataSource: DataSource) {}

  async execute(params: ReportGroupByOrderQuery): Promise<any> {
    const { customerHeadId, customerId, fromDate, toDate } = params;

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
