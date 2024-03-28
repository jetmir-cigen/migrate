import { QueryHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';

import { QueryHandlerInterface, QueryInterface } from '@skytech/common';

import { offBoardingGlobal, offBoardingLocal } from './query';
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
    const { customerHeadId, customerId, fromDate, toDate, isGlobal } = filters;

    let result;

    if (isGlobal) {
      result = await this.dataSource.query(offBoardingGlobal, [
        customerHeadId,
        fromDate,
        toDate,
      ]);
    } else {
      result = await this.dataSource.query(offBoardingLocal, [
        customerId,
        fromDate,
        toDate,
      ]);
    }
    return result.map((item) => ({
      ...item,
      buyout_price: Number(item.buyout_price),
    }));
  }
}
