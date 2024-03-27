import { QueryHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';

import {
  QueryHandlerInterface,
  QueryInterface,
} from '@skytech/manager/common/query.interface';

import { salaryDeductionUsageGlobal, salaryDeductionUsageLocal } from './query';
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
    const { customerHeadId, customerId, fromDate, toDate, isGlobal } = filters;

    let result;

    if (isGlobal) {
      result = await this.dataSource.query(salaryDeductionUsageGlobal, [
        customerHeadId,
        fromDate,
        toDate,
      ]);
    } else {
      result = await this.dataSource.query(salaryDeductionUsageLocal, [
        customerId,
        fromDate,
        toDate,
      ]);
    }

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
