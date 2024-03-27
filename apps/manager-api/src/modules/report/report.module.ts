import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  CustomerSetupExportSettingsEntity,
  SubscriptionServiceOrderActivationEntity,
} from '@skytech/db';
import { UpsertSetupExportSettingsCommandHandler } from '@skytech/manager/modules/report/commands/upsert-setup-export-settings.command';
import {
  AccountingReportQueryHandler,
  ConsumptionReportQueryHandler,
  GetSetupExportQueryHandler,
  NewNumberOrdersReportQueryHandler,
  OffBoardingReportQueryHandler,
  ReportGroupByEmployeeNoQueryHandler,
  ReportGroupByOrderQueryHandler,
  SalaryDeductionUsageReportQueryHandler,
  TaxAdvantageReportQueryHandler,
} from '@skytech/manager/modules/report/queries';
import { SetupExportSettingsController } from '@skytech/manager/modules/report/setup-export-settings.controller';

import { ReportController } from './report.controller';

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
