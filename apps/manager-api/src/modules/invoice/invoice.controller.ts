import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import {
  ADMIN_USERS_GROUP,
  AuthGuard,
  AuthUser,
  DEPARTMENT_USERS_GROUP,
  IUser,
} from '@skytech/auth';

import {
  InvoiceListResponseDto,
  InvoiceResponseDto,
} from './dto/invoice-response.dto';
import {
  FindInvoiceByFilterQuery,
  FindInvoicesByFilterQuery,
  FindVendorInvoicesByFilterQuery,
} from './queries';

@ApiTags('Invoices')
@ApiBearerAuth()
@UseGuards(AuthGuard([...ADMIN_USERS_GROUP, ...DEPARTMENT_USERS_GROUP]))
@Controller('invoices')
export class InvoiceController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOperation({
    summary: 'Find all invoices for the authenticated user',
    description: 'Returns a list of all invoices for the authenticated user.',
    tags: ['invoices'],
  })
  @ApiOkResponse({
    description: 'List of all invoices',
    type: InvoiceListResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async findAll(@AuthUser() user: IUser) {
    const invoices = await this.queryBus.execute(
      new FindInvoicesByFilterQuery({ userId: user.uid }),
    );

    return new InvoiceListResponseDto({ invoices });
  }

  @Get('/vendor')
  @ApiOperation({
    summary: 'Find all vendor invoices for the authenticated user',
    description:
      'Returns a list of all vendor invoices for the authenticated user.',
    tags: ['invoices'],
  })
  @ApiOkResponse({
    description: 'List of all vendor invoices',
    type: InvoiceListResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async findAllVendorInvoices(@AuthUser() user: IUser) {
    const invoices = await this.queryBus.execute(
      new FindVendorInvoicesByFilterQuery({
        userId: user.uid,
        customerId: user.cid,
      }),
    );

    return new InvoiceListResponseDto({ invoices });
  }

  @Get(':id(\\d+)')
  @ApiOperation({
    summary: 'Find an invoice by ID',
    description: 'Returns an invoice by ID for the authenticated user.',
    tags: ['invoices'],
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Invoice ID',
    example: 328,
  })
  @ApiOkResponse({
    description: 'The found invoice',
    type: InvoiceResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Invoice not found',
  })
  async findOne(@Param('id') id: number, @AuthUser() user: IUser) {
    const invoice = await this.queryBus.execute(
      new FindInvoiceByFilterQuery({
        userId: user.uid,
        id: id,
      }),
    );

    return new InvoiceResponseDto({ invoice });
  }
}
