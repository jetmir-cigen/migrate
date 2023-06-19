import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDownPaymentEntity } from '@/modules/report/entities/order-downpayment.entity';
import { CqrsModule } from '@nestjs/cqrs';
import {
  GetSetupExportQueryHandler,
  ReportGroupByEmployeeNoQueryHandler,
  ReportGroupByOrderQueryHandler,
} from '@/modules/report/queries';
import { CustomerSetupExportSettingsEntity } from '@/modules/report/entities/customer-setup-export-settings.entity';
import { SetupExportSettingsController } from '@/modules/report/setup-export-settings.controller';
import { UpsertSetupExportSettingsCommandHandler } from '@/modules/report/commands/upsert-setup-export-settings.controller';
import { CostObjectEntity } from '@/common/entities/cost-object.entity';
import { DPOrderDownPaymentEntity } from './entities/device_policy.order_down_payment.entity';
import { EOrderDownPaymentEntity } from './entities/ecom.order_down_payment.entity';
import { DPOrderEntity } from './entities/device_policy.order.entity';
import { DPProductEntity } from './entities/device_policy.product.entity';
import { EOrderEntity } from './entities/ecom.order.entity';
import { AAssetEntity } from './entities/assets.asset.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderDownPaymentEntity,
      CostObjectEntity,
      CustomerSetupExportSettingsEntity,
      EOrderDownPaymentEntity,
      DPOrderDownPaymentEntity,
      DPOrderEntity,
      DPProductEntity,
      EOrderEntity,
      AAssetEntity,
    ]),
    CqrsModule,
  ],
  controllers: [ReportController, SetupExportSettingsController],
  providers: [
    GetSetupExportQueryHandler,
    UpsertSetupExportSettingsCommandHandler,
    ReportGroupByOrderQueryHandler,
    ReportGroupByEmployeeNoQueryHandler,
  ],
})
export class ReportModule {}
