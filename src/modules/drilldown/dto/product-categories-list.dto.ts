import { ApiProperty } from '@nestjs/swagger';

export class ListProductCategoriesDto {
  @ApiProperty({
    description: 'Amount.',
    type: 'number',
    example: 22,
  })
  amount: number;

  @ApiProperty({
    description: 'Salary deduction amount.',
    type: 'number',
    example: 44,
  })
  salaryDeductionAmount: number;

  @ApiProperty({
    description: 'Product category id.',
    type: 'number',
    example: 1,
  })
  productCategoryId: number;

  @ApiProperty({
    description: 'Product category name.',
    type: 'string',
    example: 'Category Name',
  })
  productCategoryName: string;
}
