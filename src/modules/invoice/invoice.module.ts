import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceEntity } from './entities/invoice.entity';
import { CqrsModule } from '@nestjs/cqrs';
import {
  FindInvoiceByFilterQueryHandler,
  FindInvoicesByFilterQueryHandler,
  FindVendorInvoicesByFilterQueryHandler,
} from './queries';
import { VendorEntity } from '@/common/entities/vendor.entity';
import { InvoiceRowEntity } from './entities/invoice-row.entity';
import { CostObjectEntity } from '@/common/entities/cost-object.entity';
import { ProductEntity } from '@/common/entities/product.entity';
import { ProductGroupEntity } from '@/common/entities/product-group.entity';
import { ProductCategoryEntity } from '@/common/entities/product-category.entity';
import { CountryEntity } from '@/common/entities/country.entity';

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
