import {
  QueryHandlerInterface,
  QueryInterface,
} from '@/common/query.interface';
import { DataSource } from 'typeorm';
import { QueryHandler } from '@nestjs/cqrs';

import { salaryDeductionUsageQueryString } from './query';
import { QueryFilter } from '.';

export class SalaryDeductionUsageReportQuery implements QueryInterface {
  $$resolveType: any;

  constructor(public readonly filters: QueryFilter) {}
}

@QueryHandler(SalaryDeductionUsageReportQuery)
export class SalaryDeductionUsageReportQueryHandler
  implements QueryHandlerInterface<SalaryDeductionUsageReportQuery>
{
  constructor(private dataSource: DataSource) {}

  async execute({ filters }: SalaryDeductionUsageReportQuery): Promise<any> {
    const { customerHeadId, customerId, fromDate, toDate } = filters;

    // Parameters should be in the order of the query string
    return this.dataSource.query(salaryDeductionUsageQueryString, [
      customerId,
      customerHeadId,
      fromDate,
      toDate,
    ]);
  }
}
