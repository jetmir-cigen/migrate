import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { ProductGroupDto } from './product-group.dto';

export class ProductDto {
  @ApiProperty({
    description: 'The ID of the product',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The ID of the product group',
    example: 1,
    required: false,
  })
  @IsInt()
  productGroupId: number;

  @ApiProperty({
    description: 'The name of the product',
    example: 'Product Name',
    required: false,
    maxLength: 75,
  })
  @IsOptional()
  @IsString()
  @MaxLength(75)
  name?: string;

  @ApiProperty({
    description: 'The cost type of the product',
    example: 0,
    required: false,
  })
  @IsOptional()
  @IsInt()
  costType?: number;

  @ApiProperty({
    description: 'Flag indicating if VAT is applicable to the product',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  vat?: boolean;

  @ApiProperty({
    description: 'The price type of the product',
    example: 'Q',
    required: false,
    maxLength: 1,
  })
  @IsOptional()
  @IsString()
  @MaxLength(1)
  priceType?: string;

  @ApiProperty({
    description:
      'Flag indicating if price check is not required for the product',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  noPriceCheck?: boolean;

  @ApiProperty({
    description: 'The sort order of the product',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  sortOrder?: number | null;

  @ApiProperty({
    description: 'The country code of the product',
    example: 'US',
    required: false,
    maxLength: 4,
  })
  @IsOptional()
  @IsString()
  @MaxLength(4)
  countryCode?: string | null;

  @ApiProperty({
    description: 'Flag indicating if tax report is required for the product',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  taxReport?: boolean;

  @ApiProperty({
    description: 'The product type',
    example: 0,
    required: false,
  })
  @IsOptional()
  @IsInt()
  productType?: number;

  @ApiProperty({
    description: 'Flag indicating if VAT is included in the product price',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  vatIncluded?: boolean;

  @ApiProperty({
    description: 'The ID of the country',
    example: 47,
    required: false,
  })
  @IsOptional()
  @IsInt()
  countryId?: number;

  @ApiProperty({
    description: 'The VAT rate of the product',
    example: 0.25,
    required: false,
  })
  @IsOptional()
  @IsInt()
  vatRate?: number;

  @ApiProperty({
    description: 'The product group',
    required: false,
    type: ProductGroupDto,
  })
  productGroup: ProductGroupDto;
}
