import { ApiProperty } from '@nestjs/swagger';

import { CountryDto } from './country.dto';
import { ProductCategoryDto } from './product-category.dto';

export class ProductGroupDto {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the product group.',
  })
  id: number;

  @ApiProperty({
    example: 'Product Group Name',
    description: 'The name of the product group.',
    maxLength: 45,
  })
  name: string;

  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the product category.',
  })
  productCategoryId: number;

  @ApiProperty({
    example: 47,
    description: 'The unique identifier for the country.',
    default: 47,
  })
  countryId: number;

  @ApiProperty({
    description: 'The product category associated with the product group.',
    type: ProductCategoryDto,
  })
  productCategory: ProductCategoryDto;

  @ApiProperty({
    description: 'The country associated with the product group.',
    nullable: true,
    type: CountryDto,
  })
  country: CountryDto;
}
