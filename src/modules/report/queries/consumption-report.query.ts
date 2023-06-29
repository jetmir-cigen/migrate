import {
  QueryHandlerInterface,
  QueryInterface,
} from '@/common/query.interface';
import { DataSource } from 'typeorm';
import { QueryHandler } from '@nestjs/cqrs';

import { consumptionQueryString } from './query';
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
    const { customerHeadId, customerId, fromDate, toDate } = filters;
    // Parameters should be in the order of the query string
    return this.dataSource.query(consumptionQueryString, [
      customerId,
      customerHeadId,
      fromDate,
      toDate,
    ]);
  }
}
