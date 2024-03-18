import { ApiProperty } from '@nestjs/swagger';

export class ProductCategoryDto {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the product category.',
  })
  id: number;

  @ApiProperty({
    example: 'Product Category Name',
    description: 'The name of the product category.',
    maxLength: 45,
  })
  name: string;
}
