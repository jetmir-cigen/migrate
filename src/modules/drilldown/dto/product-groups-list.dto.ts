import { ApiProperty } from '@nestjs/swagger';

export class ProductGroupsListDto {
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
    description: 'Product group id.',
    type: 'number',
    example: 1,
  })
  productGroupId: number;

  @ApiProperty({
    description: 'Product group name.',
    type: 'string',
    example: 'John Doe',
  })
  productGroupName: string;
}
