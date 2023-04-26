import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthUser } from '../auth/auth-user.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';
import {
  FindInvoicesByFilterQuery,
  FindInvoiceByFilterQuery,
  FindVendorInvoicesByFilterQuery,
} from './queries';

@ApiTags('Invoices')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('invoices')
export class InvoiceController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async findAll(@AuthUser() user: Express.AuthUser) {
    const invoices = await this.queryBus.execute(
      new FindInvoicesByFilterQuery({
        userId: user.uid,
        customerId: user.cid,
      }),
    );

    return invoices;
  }

  @Get('/vendor')
  async findAllVendorInvoices(@AuthUser() user: Express.AuthUser) {
    const invoices = await this.queryBus.execute(
      new FindVendorInvoicesByFilterQuery({
        userId: user.uid,
        customerId: user.cid,
      }),
    );

    return invoices;
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @AuthUser() user: Express.AuthUser) {
    const invoice = await this.queryBus.execute(
      new FindInvoiceByFilterQuery({
        userId: user.uid,
        id: id,
      }),
    );

    return invoice;
  }
}
