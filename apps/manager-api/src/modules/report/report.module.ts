import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import {
  GetSetupExportQueryHandler,
  ReportGroupByEmployeeNoQueryHandler,
  ReportGroupByOrderQueryHandler,
  AccountingReportQueryHandler,
  OffBoardingReportQueryHandler,
  ConsumptionReportQueryHandler,
  SalaryDeductionUsageReportQueryHandler,
  TaxAdvantageReportQueryHandler,
  NewNumberOrdersReportQueryHandler,
} from '@/modules/report/queries';
import { CustomerSetupExportSettingsEntity } from '@/modules/report/entities/customer-setup-export-settings.entity';
import { SetupExportSettingsController } from '@/modules/report/setup-export-settings.controller';
import { UpsertSetupExportSettingsCommandHandler } from '@/modules/report/commands/upsert-setup-export-settings.command';
import { SubscriptionServiceOrderActivationEntity } from '../subscriptions/entities/subscription-service-order-activation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CustomerSetupExportSettingsEntity,
      SubscriptionServiceOrderActivationEntity,
    ]),
    CqrsModule,
  ],
  controllers: [ReportController, SetupExportSettingsController],
  providers: [
    GetSetupExportQueryHandler,
    UpsertSetupExportSettingsCommandHandler,
    ReportGroupByOrderQueryHandler,
    ReportGroupByEmployeeNoQueryHandler,
    AccountingReportQueryHandler,
    OffBoardingReportQueryHandler,
    ConsumptionReportQueryHandler,
    SalaryDeductionUsageReportQueryHandler,
    TaxAdvantageReportQueryHandler,
    NewNumberOrdersReportQueryHandler,
  ],
})
export class ReportModule {}
