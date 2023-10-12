import { Module } from '@nestjs/common';
import { DrillDownController } from './drilldown.controller';
import { DrillDownService } from './drilldown.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerViewEntity } from '@/common/entities/customer-view.entity';
import { GetTotalQueryHandler } from '@/modules/drilldown/queries/get-total.query';
import { InvoiceRowViewEntity } from '@/common/entities/invoice-row-view.entity';
import { GetProductCategoriesQueryHandler } from '@/modules/drilldown/queries/get-product-categories.queries';
import { ManagerAccessFrameAgreementViewEntity } from '@/common/entities/manager-access-frame-agreement-view.entity';
import { QueryModule } from '@/modules/query/query.module';

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
  ],
})
export class DrillDownModule {}
