import { SuccessResponseDto } from '@skytech/manager/common/dto/status-response.dto';
import { ElementLabelDto } from '@skytech/manager/modules/element-label/dto/element-label-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { InvoiceRowDto } from './invoice-row.dto';
import { VendorDto } from '@skytech/manager/common/dto/vendor.dto';
import { CustomerDto } from '@skytech/manager/modules/customer/dto/customer.dto';
export class InvoiceDto {
  @ApiProperty({
    description: 'The ID of the invoice',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  id: number;

  @ApiProperty({
    description: 'The ID of the vendor associated with the invoice',
    example: 1,
    required: true,
  })
  @IsInt()
  vendorId: number;

  @ApiProperty({
    description: 'The vendor associated with the invoice',
    type: VendorDto,
  })
  vendor: VendorDto;

  @ApiProperty({
    description: 'The ID of the customer associated with the invoice',
    example: 1,
    required: true,
  })
  @IsInt()
  customerId: number;

  @ApiProperty({
    description: 'The customer associated with the invoice',
    type: CustomerDto,
  })
  customer: CustomerDto;

  @ApiProperty({
    description: 'The invoice number',
    example: 'INV001',
    required: true,
    maxLength: 25,
  })
  @IsString()
  @MaxLength(25)
  invoiceNo: string;

  @ApiProperty({
    description: 'The date of the invoice',
    example: '2023-05-18',
    required: true,
  })
  @IsDate()
  date: Date;

  @ApiProperty({
    description: 'The due date of the invoice',
    example: '2023-06-01',
    required: true,
  })
  @IsDate()
  dueDate: Date;

  @ApiProperty({
    description: 'The status of invoice sent',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  sent: boolean;

  @ApiProperty({
    description: 'The ID of the invoice account',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  invoiceAccountId: number | null;

  @ApiProperty({
    description: 'The amount of the invoice',
    example: 100.5,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  invoiceAmount: number;

  @ApiProperty({
    description: 'The control amount of the invoice',
    example: 90.25,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  invoiceControlAmount: number;

  @ApiProperty({
    description: 'The ID of the element label associated with the invoice',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  elementLabelId: number;

  @ApiProperty({
    description: 'The element label associated with the invoice',
    type: ElementLabelDto,
  })
  elementLabel: ElementLabelDto;

  @ApiProperty({
    description: 'The KID number',
    example: 'KID123',
    required: false,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  kidnumber: string | null;

  @ApiProperty({
    description: 'The net amount of the vendor',
    example: 80.5,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  vendorNetAmount: number | null;

  @ApiProperty({
    description: 'The VAT amount of the vendor',
    example: 20.25,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  vendorVatAmount: number | null;

  @ApiProperty({
    description: 'The gross amount of the vendor',
    example: 100.75,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  vendorGrossAmount: number | null;

  @ApiProperty({
    description: 'The file name of the invoice',
    example: 'invoice.pdf',
    required: false,
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  invoiceFileName: string | null;

  @ApiProperty({
    description: 'The EHF status',
    example: 'approved',
    required: false,
    maxLength: 45,
  })
  @IsOptional()
  @IsString()
  @MaxLength(45)
  ehfStatus: string | null;

  @ApiProperty({
    description: 'The recipient of the invoice',
    example: 'John Doe',
    required: false,
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  invoiceRecipient: string | null;

  @ApiProperty({
    description: 'The date the invoice was created',
    example: '2023-05-18T10:30:00Z',
    required: false,
  })
  @IsOptional()
  @IsDate()
  created: Date | null;

  @ApiProperty({
    description: 'The ID of the user who created the invoice',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  createdUserId: number | null;

  @ApiProperty({
    description: 'The last update date of the invoice',
    example: '2023-05-18T15:45:00Z',
    required: false,
  })
  @IsOptional()
  @IsDate()
  lastUpdate: Date;

  @ApiProperty({
    description: 'The ID of the invoice classification',
    example: 1,
    required: true,
  })
  @IsInt()
  invoiceClassificationId: number;

  @ApiProperty({
    description: 'The rows associated with the invoice',
    type: [InvoiceRowDto],
  })
  rows: InvoiceRowDto[];
}

export class InvoiceListResponseDto extends SuccessResponseDto {
  constructor(init: Pick<InvoiceListResponseDto, 'invoices'>) {
    super();
    this.invoices = init.invoices;
  }

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
