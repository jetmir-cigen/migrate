import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import {
  FindInvoiceByFilterQueryHandler,
  FindInvoicesByFilterQueryHandler,
  FindVendorInvoicesByFilterQueryHandler,
} from './queries';
import {
  CostObjectEntity,
  CountryEntity,
  InvoiceEntity,
  InvoiceRowEntity,
  ProductCategoryEntity,
  ProductEntity,
  ProductGroupEntity,
  VendorEntity,
} from '@skytech/db';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      InvoiceEntity,
      VendorEntity,
      InvoiceRowEntity,
      CostObjectEntity,
      ProductEntity,
      ProductGroupEntity,
      ProductCategoryEntity,
      CountryEntity,
    ]),
  ],
  controllers: [InvoiceController],
  providers: [
    InvoiceService,
    FindInvoiceByFilterQueryHandler,
    FindInvoicesByFilterQueryHandler,
    FindVendorInvoicesByFilterQueryHandler,
  ],
})
export class InvoiceModule {}
