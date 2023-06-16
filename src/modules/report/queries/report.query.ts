import {
  QueryHandlerInterface,
  QueryInterface,
} from '@/common/query.interface';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryHandler } from '@nestjs/cqrs';
import { DPOrderDownPaymentEntity } from '../entities/device_policy.order_down_payment.entity';
import { EOrderDownPaymentEntity } from '../entities/ecom.order_down_payment.entity';
import { CustomerSetupExportSettingsEntity } from '../entities/customer-setup-export-settings.entity';
import { CostObjectEntity } from '@/common/entities/cost-object.entity';
import { CustomerEntity } from '@/modules/customer/entities/customer.entity';
import { DPOrderEntity } from '../entities/device_policy.order.entity';
import { DPProductEntity } from '../entities/device_policy.product.entity';
import { DepartmentEntity } from '@/modules/department/entities/department.entity';
import { EOrderEntity } from '../entities/ecom.order.entity';
import { AAssetEntity } from '../entities/assets.asset.entity';

import { query } from './query';

export class ReportQuery implements QueryInterface {
  $$resolveType: any;

  constructor(public readonly customerId: number) {}
}

@QueryHandler(ReportQuery)
export class ReportQueryHandler implements QueryHandlerInterface<ReportQuery> {
  constructor(
    @InjectRepository(DPOrderDownPaymentEntity)
    private readonly DPOrderDownPaymentRepository: Repository<DPOrderDownPaymentEntity>,
    @InjectRepository(EOrderDownPaymentEntity)
    private readonly EOrderDownPaymentEntityRepository: Repository<EOrderDownPaymentEntity>,
    private dataSource: DataSource,
  ) {}

  async execute(): Promise<any> {
    const customerId = 1; // Replace with the actual customer ID
    const customerHeadId = 1; // Replace with the actual customer head ID
    const fromDate = '2023-01-01'; // Replace with the actual start date
    const toDate = '2023-12-31'; // Replace with the actual end date

    return this.dataSource.query(query, [
      customerId,
      customerHeadId,
      fromDate,
      toDate,
      customerId,
      customerHeadId,
      fromDate,
      toDate,
    ]);
  }
}
