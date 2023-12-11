import { Module } from '@nestjs/common';
import { DrillDownController } from './drilldown.controller';
import { DrillDownService } from './drilldown.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerViewEntity } from '@/common/entities/customer-view.entity';
import { GetTotalQueryHandler } from '@/modules/drilldown/queries/get-total.query';
import { InvoiceRowViewEntity } from '@/common/views/invoice-row-view.entity';
import { GetProductCategoriesQueryHandler } from '@/modules/drilldown/queries/get-product-categories.queries';
import { QueryModule } from '@/modules/query/query.module';
import { ManagerAccessFrameAgreementViewEntity } from '@/common/views';
import { GetProductGroupsQueryHandler } from './queries/get-product-groups.query';
import { GetProductGroupsCategoriesQueryHandler } from './queries/get-product-groups-categories.query';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CustomerViewEntity,
      InvoiceRowViewEntity,
      ManagerAccessFrameAgreementViewEntity,
    ]),
    QueryModule,
  ],
  controllers: [DrillDownController],
  providers: [
    DrillDownService,
    GetTotalQueryHandler,
    GetProductCategoriesQueryHandler,
    GetProductGroupsQueryHandler,
    GetProductGroupsCategoriesQueryHandler,
  ],
})
export class DrillDownModule {}
