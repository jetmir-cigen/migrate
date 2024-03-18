import { Module } from '@nestjs/common';
import { DrillDownController } from './drilldown.controller';
import { DrillDownService } from './drilldown.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerViewEntity } from '@skytech/manager/common/entities/customer-view.entity';
import { GetTotalQueryHandler } from '@skytech/manager/modules/drilldown/queries/get-total.query';
import { InvoiceRowViewEntity } from '@skytech/manager/common/views/invoice-row-view.entity';
import { ServiceReportQueryHandler } from '@skytech/manager/modules/drilldown/queries/service/service-report.queries';
import { QueryModule } from '@skytech/manager/modules/query/query.module';
import {
  ManagerAccessDepartmentView,
  ManagerAccessFrameAgreementViewEntity,
} from '@skytech/manager/common/views';
import { GetReportByDepartmentQueryHandler } from './queries/department/get-report-by-department.queries';
import { DepartmentEntity } from '../department/entities/department.entity';
import { InvoiceRowEntity } from '../invoice/entities/invoice-row.entity';
import { GetReportByCostObjectQueryHandler } from './queries/cost-object/get-report-by-cost-object.queries';
import { CostObjectEntity } from '@skytech/manager/common/entities/cost-object.entity';
import { ServiceProductCategoryReportQueryHandler } from './queries/service/service-product-category-report.queries';
import { ServiceCategoryAndGroupReportQueryHandler } from './queries/service/service-category-and-group-report.queries';
import { CostObjectsServiceCategoryAndGroupReportQueryHandler } from './queries/service/cost-objects-service-category-and-group-report.queries';
import { GetCostObjectReportByDepartmentQueryHandler } from './queries/department/cost-objects-report-by-department.queries';
import { GetProductReportByDepartmentAndCostObjectQueryHandler } from './queries/department/product-report-by-department-cost-object.queries';
import { GetProductReportByCostObjectQueryHandler } from './queries/cost-object/product-report-by-cost-object.queries';
import { CustomerEntity } from '../customer/entities/customer.entity';
import { ProductCategoryEntity } from '@skytech/manager/common/entities/product-category.entity';
import { ProductGroupEntity } from '@skytech/manager/common/entities/product-group.entity';
import { ProductEntity } from '@skytech/manager/common/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CustomerEntity,
      ProductEntity,
      ProductCategoryEntity,
      ProductGroupEntity,
      CustomerViewEntity,
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
