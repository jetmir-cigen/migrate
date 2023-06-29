import {
  QueryHandlerInterface,
  QueryInterface,
} from '@/common/query.interface';
import { DataSource } from 'typeorm';
import { QueryHandler } from '@nestjs/cqrs';

import { taxAdvantageQueryString } from './query';

export class TaxAdvantageReportQuery implements QueryInterface {
  $$resolveType: any;

  constructor(
    public readonly filters: {
      customerHeadId: number;
      customerId: number;
      year: number;
    },
  ) {}
}

@QueryHandler(TaxAdvantageReportQuery)
export class TaxAdvantageReportQueryHandler
  implements QueryHandlerInterface<TaxAdvantageReportQuery>
{
  constructor(private dataSource: DataSource) {}

  async execute({ filters }: TaxAdvantageReportQuery): Promise<any> {
    const { customerHeadId, customerId, year } = filters;

    // Parameters should be in the order of the query string
    return this.dataSource.query(taxAdvantageQueryString, [
      customerId,
      customerHeadId,
      year,
    ]);
  }
}
