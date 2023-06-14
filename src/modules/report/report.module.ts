import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDownPaymentEntity } from '@/modules/report/entities/order-downpayment.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { GetSetupExportQueryHandler } from '@/modules/report/queries';
import { CustomerSetupExportSettingsEntity } from '@/modules/report/entities/customer-setup-export-settings.entity';
import { SetupExportSettingsController } from '@/modules/report/setup-export-settings.controller';
import { UpsertSetupExportSettingsCommandHandler } from '@/modules/report/commands/upsert-setup-export-settings.controller';
import { CostObjectEntity } from '@/common/entities/cost-object.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderDownPaymentEntity,
      CostObjectEntity,
      CustomerSetupExportSettingsEntity,
    ]),
    CqrsModule,
  ],
  controllers: [ReportController, SetupExportSettingsController],
  providers: [
    GetSetupExportQueryHandler,
    UpsertSetupExportSettingsCommandHandler,
  ],
})
export class ReportModule {}
