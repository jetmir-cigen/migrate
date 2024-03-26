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
} from '@skytech/manager/modules/report/queries';
import { SetupExportSettingsController } from '@skytech/manager/modules/report/setup-export-settings.controller';
import { UpsertSetupExportSettingsCommandHandler } from '@skytech/manager/modules/report/commands/upsert-setup-export-settings.command';
import {
  CustomerSetupExportSettingsEntity,
  SubscriptionServiceOrderActivationEntity,
} from '@skytech/db';

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
