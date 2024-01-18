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
    const result = await this.dataSource.query(
      salaryDeductionUsageQueryString,
      [customerId, customerHeadId, fromDate, toDate],
    );

    return result.map((item) => ({
      ...item,
      fixed_salary_deduction_amount: Number(item.fixed_salary_deduction_amount),
      amount: Number(item.amount),
      vat: Number(item.vat),
      netVat: Number(item.netVat),
      netNoVat: Number(item.netNoVat),
      posts: Number(item.posts),
    }));
  }
}
