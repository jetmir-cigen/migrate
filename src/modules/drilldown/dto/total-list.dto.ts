import { ApiProperty } from '@nestjs/swagger';

export class ListTotalDto {
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
    description: 'Customer id.',
    type: 'number',
    example: 1,
  })
  customerId: number;

  @ApiProperty({
    description: 'Customer name.',
    type: 'string',
    example: 'John Doe',
  })
  customerName: string;

  @ApiProperty({
    description: 'Customer organization number.',
    type: 'string',
    example: '123456789',
  })
  customerOrgNo: string;

  @ApiProperty({
    description: 'Customer head id.',
    type: 'number',
    example: 10,
  })
  customerHeadId: number;

  @ApiProperty({
    description: 'Customer head name.',
    type: 'string',
    example: 'Jane Smith',
  })
  customerHeadName: string;

  @ApiProperty({
    description: 'Customer head frame agreement id.',
    type: 'number',
    example: 20,
  })
  customerHeadFrameAgreementId: number;

  @ApiProperty({
    description: 'Customer head frame agreement name.',
    type: 'string',
    example: 'Agreement 1',
  })
  customerHeadFrameAgreementName: string;
}
