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

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([InvoiceEntity])],
  controllers: [InvoiceController],
  providers: [
    InvoiceService,
    FindInvoiceByFilterQueryHandler,
    FindInvoicesByFilterQueryHandler,
    FindVendorInvoicesByFilterQueryHandler,
  ],
})
export class InvoiceModule {}
