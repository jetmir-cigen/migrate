import { CostObjectEntity } from '@skytech/manager/common/entities/cost-object.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { InvoiceDto } from './invoice-response.dto';
import { ProductDto } from '@skytech/manager/common/dto/product.dto';

export class InvoiceRowDto {
  @ApiProperty({
    description: 'The ID of the invoice row',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  id: number;

  @ApiProperty({
    description: 'The ID of the invoice associated with the row',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  invoiceId: number;

  @ApiProperty({
    description: 'The ID of the product associated with the row',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  productId: number;

  @ApiProperty({
    description: 'The ID of the cost object associated with the row',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  costObjectId: number;

  @ApiProperty({
    description: 'The quantity of the product',
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  quantity: number;

  @ApiProperty({
    description: 'The peak volume',
    example: 1000,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  peakVolume: number;

  @ApiProperty({
    description: 'The off-peak volume',
    example: 500,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  offPeakVolume: number;

  @ApiProperty({
    description: 'The amount of the invoice row',
    example: 100.5,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({
    description: 'The contract amount',
    example: 200.75,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  contractAmount: number;

  @ApiProperty({
    description: 'The start date of the billing period',
    example: '2023-01-01',
  })
  @IsDate()
  fromPeriod: Date;

  @ApiProperty({
    description: 'The end date of the billing period',
    example: '2023-01-31',
  })
  @IsDate()
  toPeriod: Date;

  @ApiProperty({
    description: 'The text description of the invoice row',
    example: 'Product ABC',
    required: true,
    maxLength: 255,
  })
  @IsString()
  @MaxLength(255)
  text: string;

  @ApiProperty({
    description: 'The date the invoice row was billed',
    example: '2023-02-01',
  })
  @IsDate()
  billed: Date;

  @ApiProperty({
    description: 'The exception status code',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  exceptionStatus: number;

  @ApiProperty({
    description: 'The comment for the exception status',
    example: 'Invalid quantity',
    required: false,
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  exceptionComment: string;

  @ApiProperty({
    description: 'The private status code',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  private: number;

  @ApiProperty({
    description: 'The comment for the private status',
    example: 'Private note',
    required: false,
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  privateComment: string;

  @ApiProperty({
    description: 'The salary deduction amount',
    example: 50.25,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  salaryDeductionAmount: number;

  @ApiProperty({
    description: 'The pending salary deduction amount',
    example: 25.5,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  pendingSalaryDeductionAmount: number;

  @ApiProperty({
    description: 'The vendor VAT amount',
    example: 10.0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  vendorVatAmount: number;

  @ApiProperty({
    description: 'The cost reference',
    example: 'REF123',
    required: false,
    maxLength: 125,
  })
  @IsOptional()
  @IsString()
  @MaxLength(125)
  costReference: string;

  @ApiProperty({
    description: 'The VAT amount',
    example: 15.0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  vatAmount: number;

  @ApiProperty({
    description: 'The cost object associated with the row',
    type: CostObjectEntity,
  })
  costObject: CostObjectEntity;

  @ApiProperty({
    description: 'The invoice associated with the row',
    type: () => InvoiceDto,
  })
  invoice: InvoiceDto;

  @ApiProperty({
    description: 'The product associated with the row',
    type: ProductDto,
  })
  product: ProductDto;
}
