import { SuccessResponseDto } from '@/common/dto/status-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class InvoiceDto {
  @ApiProperty({
    description: 'Unique identifier of the invoice',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Identifier of the vendor who issued the invoice',
    example: 1,
  })
  vendorId: number;

  // @ApiProperty({
  //   description: 'Customer entity associated with the invoice',
  //   type: () => CustomerEntity,
  // })
  // customer: CustomerEntity;

  @ApiProperty({
    description: 'Invoice number',
    example: 'INV-001',
  })
  invoiceNo: string;

  @ApiProperty({
    description: 'Date the invoice was issued',
    example: '2022-01-01',
  })
  date: Date;

  @ApiProperty({
    description: 'Date the invoice is due',
    example: '2022-02-01',
  })
  dueDate: Date;

  @ApiProperty({
    description: 'Flag indicating whether the invoice has been sent',
    example: true,
  })
  sent: boolean;

  @ApiProperty({
    description: 'Identifier of the invoice account',
    example: 1,
  })
  invoiceAccountId: number;

  @ApiProperty({
    description: 'Amount of the invoice, in decimal format',
    example: 100.0,
  })
  invoiceAmount: number;

  @ApiProperty({
    description: 'Control amount of the invoice, in decimal format',
    example: 100.0,
  })
  invoiceControlAmount: number;

  // @ApiProperty({
  //   description: 'Element label associated with the invoice',
  //   type: () => ElementLabelEntity,
  // })
  // elementLabel: ElementLabelEntity;

  @ApiProperty({
    description: 'KID number associated with the invoice',
    example: '1234567890',
  })
  kidnumber: string;

  @ApiProperty({
    description: 'Net amount of the vendor, in decimal format',
    example: 80.0,
  })
  vendorNetAmount: number;

  @ApiProperty({
    description: 'VAT amount of the vendor, in decimal format',
    example: 20.0,
  })
  vendorVatAmount: number;

  @ApiProperty({
    description: 'Gross amount of the vendor, in decimal format',
    example: 100.0,
  })
  vendorGrossAmount: number;

  @ApiProperty({
    description: 'Name of the invoice file',
    example: 'invoice.pdf',
  })
  invoiceFileName: string;

  @ApiProperty({
    description: 'Status of the EHF',
    example: 'Sent',
  })
  ehfStatus: string;

  @ApiProperty({
    description: 'Recipient of the invoice',
    example: 'John Doe',
  })
  invoiceRecipient: string;

  @ApiProperty({
    description: 'Date the invoice was created',
    example: '2022-01-01T00:00:00.000Z',
  })
  created: Date;

  @ApiProperty({
    description: 'Identifier of the user who created the invoice',
    example: 1,
  })
  createdUserId: number;

  @ApiProperty({
    description: 'Date the invoice was last updated',
    example: '2022-01-01T00:00:00.000Z',
  })
  lastUpdate: Date;

  @ApiProperty({
    description: 'Identifier of the invoice classification',
    example: 1,
  })
  invoiceClassificationId: number;
}

export class InvoiceListResponseDto extends SuccessResponseDto {
  constructor(init: Pick<InvoiceListResponseDto, 'invoices'>) {
    super();
    // this.total = init.total;
    this.invoices = init.invoices;
  }
  // @ApiProperty({
  //   description: 'Total count of invoice.',
  //   type: 'integer',
  //   example: 162,
  // })
  // total: number;

  @ApiProperty({
    description: 'List of invoice',
    type: InvoiceDto,
    isArray: true,
  })
  invoices: InvoiceDto[];
}

export class InvoiceResponseDto extends SuccessResponseDto {
  constructor(init: Pick<InvoiceResponseDto, 'invoice'>) {
    super();
    this.invoice = init.invoice;
  }

  @ApiProperty({
    description: 'Invoice ',
    type: InvoiceDto,
  })
  invoice: InvoiceDto;
}
