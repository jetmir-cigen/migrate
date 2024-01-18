import {
  QueryHandlerInterface,
  QueryInterface,
} from '@/common/query.interface';
import { DataSource } from 'typeorm';
import { QueryHandler } from '@nestjs/cqrs';

import { groupByEmployeeNo } from './query';

export class ReportGroupByEmployeeNoQuery implements QueryInterface {
  $$resolveType: any;

  constructor(
    public readonly customerId: number,
    public readonly customerHeadId: number,
    public readonly fromDate: string,
    public readonly toDate: string,
  ) {}
}

@QueryHandler(ReportGroupByEmployeeNoQuery)
export class ReportGroupByEmployeeNoQueryHandler
  implements QueryHandlerInterface<ReportGroupByEmployeeNoQuery>
{
  constructor(private dataSource: DataSource) {}

  async execute(params: ReportGroupByEmployeeNoQuery): Promise<any> {
    const { customerHeadId, customerId, fromDate, toDate } = params;

    const result = await this.dataSource.query(groupByEmployeeNo, [
      customerId,
      customerHeadId,
      fromDate,
      toDate,
      customerId,
      customerHeadId,
      fromDate,
      toDate,
    ]);

    return result.map((item) => ({
      ...item,
      amount: Number(item.amount),
    }));
  }
}
