import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

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

import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import {
  FindInvoiceByFilterQueryHandler,
  FindInvoicesByFilterQueryHandler,
  FindVendorInvoicesByFilterQueryHandler,
} from './queries';

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
