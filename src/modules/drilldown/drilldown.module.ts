import { Module } from '@nestjs/common';
import { DrillDownController } from './drilldown.controller';
import { DrillDownService } from './drilldown.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerViewEntity } from '@/common/entities/customer-view.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { GetTotalQueryHandler } from '@/modules/drilldown/queries/get-total.query';
import { InvoiceRowViewEntity } from '@/common/entities/invoice-row-view.entity';
import { GetProductCategoriesQueryHandler } from '@/modules/drilldown/queries/get-product-categories.queries';
import { ManagerAccessFrameAgreementViewEntity } from '@/common/entities/manager-access-frame-agreement-view.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CustomerViewEntity,
      InvoiceRowViewEntity,
      ManagerAccessFrameAgreementViewEntity,
    ]),
    CqrsModule,
  ],
  controllers: [DrillDownController],
  providers: [
    DrillDownService,
    GetTotalQueryHandler,
    GetProductCategoriesQueryHandler,
  ],
})
export class DrillDownModule {}
