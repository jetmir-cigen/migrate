import {
  QueryHandlerInterface,
  QueryInterface,
} from '@/common/query.interface';
import { DataSource } from 'typeorm';
import { QueryHandler } from '@nestjs/cqrs';

import { consumptionGlobal, consumptionLocal } from './query';
import { QueryFilter } from '.';

export class ConsumptionReportQuery implements QueryInterface {
  $$resolveType: any;

  constructor(public readonly filters: QueryFilter) {}
}

@QueryHandler(ConsumptionReportQuery)
export class ConsumptionReportQueryHandler
  implements QueryHandlerInterface<ConsumptionReportQuery>
{
  constructor(private dataSource: DataSource) {}

  async execute({ filters }: ConsumptionReportQuery): Promise<any> {
    const { customerHeadId, customerId, fromDate, toDate, isGlobal } = filters;

    let result;

    if (isGlobal) {
      result = await this.dataSource.query(consumptionGlobal, [
        customerHeadId,
        fromDate,
        toDate,
      ]);
    } else {
      result = await this.dataSource.query(consumptionLocal, [
        customerId,
        fromDate,
        toDate,
      ]);
    }

    return result.map((item) => ({
      ...item,
      tax_report_amount: Number(item.tax_report_amount),
      subscription_amount: Number(item.subscription_amount),
      one_time_amount: Number(item.one_time_amount),
      traffic_amount: Number(item.traffic_amount),
      deduction_amount: Number(item.deduction_amount),
      total_amount: Number(item.total_amount),
    }));
  }
}
