import {
  QueryHandlerInterface,
  QueryInterface,
} from '@/common/query.interface';
import { DataSource } from 'typeorm';
import { QueryHandler } from '@nestjs/cqrs';

import { accountQueryString } from './query';
import { QueryFilter } from '.';

export class AccountingReportQuery implements QueryInterface {
  $$resolveType: any;

  constructor(public readonly filters: QueryFilter) {}
}

@QueryHandler(AccountingReportQuery)
export class AccountingReportQueryHandler
  implements QueryHandlerInterface<AccountingReportQuery>
{
  constructor(private dataSource: DataSource) {}

  async execute({ filters }: AccountingReportQuery): Promise<any> {
    const { customerHeadId, customerId, fromDate, toDate } = filters;

    // Parameters should be in the order of the query string
    return this.dataSource.query(accountQueryString, [
      customerId,
      customerHeadId,
      fromDate,
      toDate,
    ]);
  }
}
