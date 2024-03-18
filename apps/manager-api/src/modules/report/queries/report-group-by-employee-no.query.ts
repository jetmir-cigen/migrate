import {
  QueryHandlerInterface,
  QueryInterface,
} from '@skytech/manager/common/query.interface';
import { DataSource } from 'typeorm';
import { QueryHandler } from '@nestjs/cqrs';

import { groupByEmployeeNoLocal, groupByEmployeeNoGlobal } from './query';
import { QueryFilter } from '.';

export class ReportGroupByEmployeeNoQuery implements QueryInterface {
  $$resolveType: any;

  constructor(public readonly filters: QueryFilter) {}
}

@QueryHandler(ReportGroupByEmployeeNoQuery)
export class ReportGroupByEmployeeNoQueryHandler
  implements QueryHandlerInterface<ReportGroupByEmployeeNoQuery>
{
  constructor(private dataSource: DataSource) {}

  async execute({ filters }: ReportGroupByEmployeeNoQuery): Promise<any> {
    const { customerHeadId, customerId, fromDate, toDate, isGlobal } = filters;

    let result;

    if (isGlobal) {
      result = await this.dataSource.query(groupByEmployeeNoGlobal, [
        customerHeadId,
        fromDate,
        toDate,
        customerHeadId,
        fromDate,
        toDate,
      ]);
    } else {
      result = await this.dataSource.query(groupByEmployeeNoLocal, [
        customerId,
        fromDate,
        toDate,
        customerId,
        fromDate,
        toDate,
      ]);
    }

    return result.map((item) => ({
      ...item,
      amount: Number(item.amount),
    }));
  }
}
