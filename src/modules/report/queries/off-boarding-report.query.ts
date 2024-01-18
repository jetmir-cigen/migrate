import {
  QueryHandlerInterface,
  QueryInterface,
} from '@/common/query.interface';
import { DataSource } from 'typeorm';
import { QueryHandler } from '@nestjs/cqrs';

import { offBoardingQueryString } from './query';
import { QueryFilter } from './';

export class OffBoardingReportQuery implements QueryInterface {
  $$resolveType: any;

  constructor(public readonly filters: QueryFilter) {}
}

@QueryHandler(OffBoardingReportQuery)
export class OffBoardingReportQueryHandler
  implements QueryHandlerInterface<OffBoardingReportQuery>
{
  constructor(private dataSource: DataSource) {}

  async execute({ filters }: OffBoardingReportQuery): Promise<any> {
    const { customerHeadId, customerId, fromDate, toDate } = filters;
    // Parameters should be in the order of the query string
    const result = await this.dataSource.query(offBoardingQueryString, [
      customerId,
      customerHeadId,
      fromDate,
      toDate,
    ]);

    return result.map((item) => ({
      ...item,
      buyout_price: Number(item.buyout_price),
    }));
  }
}
