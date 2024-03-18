import {
  QueryHandlerInterface,
  QueryInterface,
} from '@/common/query.interface';
import { DataSource } from 'typeorm';
import { QueryHandler } from '@nestjs/cqrs';

import { accountGlobal, accountLocal } from './query';
import { QueryFilter } from '.';

export class AccountingReportQuery implements QueryInterface {
  $$resolveType: any;

  constructor(public readonly filters: QueryFilter) {}
}

@QueryHandler(AccountingReportQuery)
export class AccountingReportQueryHandler
  implements QueryHandlerInterface<AccountingReportQuery>
{
  constructor(private dataSource: DataSource) {}

  async execute({ filters }: AccountingReportQuery): Promise<any> {
    const { customerHeadId, customerId, fromDate, toDate, isGlobal } = filters;

    let result;

    if (isGlobal) {
      result = await this.dataSource.query(accountGlobal, [
        customerHeadId,
        fromDate,
        toDate,
      ]);
    } else {
      result = await this.dataSource.query(accountLocal, [
        customerId,
        fromDate,
        toDate,
      ]);
    }

    return result.map((item) => ({
      ...item,
      gross_debit: Number(item.gross_debit),
      gross_credit: Number(item.gross_credit),
      net_amount: Number(item.net_amount),
      vat_amount: Number(item.vat_amount),
      total_amount: Number(item.total_amount),
      vendor_net_amount: Number(item.vendor_net_amount),
      vendor_vat_amount: Number(item.vendor_vat_amount),
      vendor_gross_amount: Number(item.vendor_gross_amount),
      netVat: Number(item.netVat),
      netNoVat: Number(item.netNoVat),
    }));
  }
}
