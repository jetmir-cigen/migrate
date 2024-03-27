import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  CostObjectEntity,
  CustomerEntity,
  DepartmentEntity,
  InvoiceRowEntity,
  InvoiceRowViewEntity,
  ManagerAccessDepartmentView,
  ManagerAccessFrameAgreementViewEntity,
  ProductCategoryEntity,
  ProductEntity,
  ProductGroupEntity,
  ViewCustomerEntity,
} from '@skytech/db';
import { GetTotalQueryHandler } from '@skytech/manager/modules/drilldown/queries/get-total.query';
import { ServiceReportQueryHandler } from '@skytech/manager/modules/drilldown/queries/service/service-report.queries';
import { QueryModule } from '@skytech/manager/modules/query/query.module';

import { GetReportByCostObjectQueryHandler } from './queries/cost-object/get-report-by-cost-object.queries';
import { GetProductReportByCostObjectQueryHandler } from './queries/cost-object/product-report-by-cost-object.queries';
import { GetCostObjectReportByDepartmentQueryHandler } from './queries/department/cost-objects-report-by-department.queries';
import { GetReportByDepartmentQueryHandler } from './queries/department/get-report-by-department.queries';
import { GetProductReportByDepartmentAndCostObjectQueryHandler } from './queries/department/product-report-by-department-cost-object.queries';
import { CostObjectsServiceCategoryAndGroupReportQueryHandler } from './queries/service/cost-objects-service-category-and-group-report.queries';
import { ServiceCategoryAndGroupReportQueryHandler } from './queries/service/service-category-and-group-report.queries';
import { ServiceProductCategoryReportQueryHandler } from './queries/service/service-product-category-report.queries';
import { DrillDownController } from './drilldown.controller';
import { DrillDownService } from './drilldown.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CustomerEntity,
      ProductEntity,
      ProductCategoryEntity,
      ProductGroupEntity,
      ViewCustomerEntity,
      InvoiceRowViewEntity,
      ManagerAccessFrameAgreementViewEntity,
      ManagerAccessDepartmentView,
      DepartmentEntity,
      InvoiceRowEntity,
      CostObjectEntity,
    ]),
    QueryModule,
  ],
  controllers: [DrillDownController],
  providers: [
    DrillDownService,
    GetTotalQueryHandler,
    ServiceReportQueryHandler,
    ServiceProductCategoryReportQueryHandler,
    ServiceCategoryAndGroupReportQueryHandler,
    CostObjectsServiceCategoryAndGroupReportQueryHandler,
    GetReportByDepartmentQueryHandler,
    GetCostObjectReportByDepartmentQueryHandler,
    GetProductReportByDepartmentAndCostObjectQueryHandler,
    GetReportByCostObjectQueryHandler,
    GetProductReportByCostObjectQueryHandler,
  ],
})
export class DrillDownModule {}
