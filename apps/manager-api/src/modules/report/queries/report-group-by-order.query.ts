import {
  QueryHandlerInterface,
  QueryInterface,
} from '@skytech/manager/common/query.interface';
import { DataSource } from 'typeorm';
import { QueryHandler } from '@nestjs/cqrs';

import { groupByOrderGlobal, groupByOrderLocal } from './query';
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
    const { customerHeadId, customerId, fromDate, toDate, isGlobal } = filters;

    let data;

    if (isGlobal) {
      data = await this.dataSource.query(groupByOrderGlobal, [
        customerHeadId,
        fromDate,
        toDate,
        customerHeadId,
        fromDate,
        toDate,
      ]);
    } else {
      data = await this.dataSource.query(groupByOrderLocal, [
        customerId,
        fromDate,
        toDate,
        customerId,
        fromDate,
        toDate,
      ]);
    }

    return data.map((item) => ({
      ...item,
      down_payments: Number(item.down_payments),
      total_amount: Number(item.total_amount),
      cover_amount: Number(item.cover_amount),
      amount: Number(item.amount),
      content_service_amount: Number(item.content_service_amount),
      netVat: Number(item.netVat),
      remainder_amount: Number(item.remainder_amount),
      fixed_salary_deduction_amount: Number(item.fixed_salary_deduction_amount),
    }));
  }
}
