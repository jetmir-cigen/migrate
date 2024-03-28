import { QueryHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';

import { QueryHandlerInterface, QueryInterface } from '@skytech/common';

import { taxAdvantageGlobal, taxAdvantageLocal } from './query';

export class TaxAdvantageReportQuery implements QueryInterface {
  $$resolveType: any;

  constructor(
    public readonly filters: {
      customerHeadId: number;
      customerId: number;
      year: number;
      isGlobal?: boolean;
    },
  ) {}
}

@QueryHandler(TaxAdvantageReportQuery)
export class TaxAdvantageReportQueryHandler
  implements QueryHandlerInterface<TaxAdvantageReportQuery>
{
  constructor(private dataSource: DataSource) {}

  async execute({ filters }: TaxAdvantageReportQuery): Promise<any> {
    const { customerHeadId, customerId, year, isGlobal } = filters;

    let result;

    if (isGlobal) {
      result = await this.dataSource.query(taxAdvantageGlobal, [
        customerHeadId,
        year,
      ]);
    } else {
      result = await this.dataSource.query(taxAdvantageLocal, [
        customerId,
        year,
      ]);
    }

    return result.map((item) => ({
      ...item,
      amount: Number(item.amount),
      amount_ex_mva: Number(item.amount_ex_mva),
      salary_deduction_amount: Number(item.salary_deduction_amount),
      salary_deduction_amount_vat: Number(item.salary_deduction_amount_vat),
      content_service_amount: Number(item.content_service_amount),
      cost_elements: Number(item.cost_elements),
    }));
  }
}
