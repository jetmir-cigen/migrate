import { Module } from '@nestjs/common';
import { DrillDownController } from './drilldown.controller';
import { DrillDownService } from './drilldown.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerViewEntity } from '../../common/entities/customer-view.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { GetTotalQueryHandler } from '@/modules/drilldown/queries/get-total.query';
import { InvoiceRowViewEntity } from '@/common/entities/invoice-row-view.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerViewEntity, InvoiceRowViewEntity]),
    CqrsModule,
  ],
  controllers: [DrillDownController],
  providers: [DrillDownService, GetTotalQueryHandler],
})
export class DrillDownModule {}
