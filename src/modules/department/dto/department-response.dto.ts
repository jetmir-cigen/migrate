import { SuccessResponseDto } from '@/common/dto/status-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class DepartmentDto {
  @ApiProperty({
    description: 'Id of department',
    type: 'integer',
    example: '1',
  })
  id: number;

  // @ApiProperty({
  //   description: 'Id of department',
  //   type: 'integer',
  //   example: '1',
  // })
  // customer: CustomerEntity;

  @ApiProperty({
    description: 'Id of customer',
    type: 'integer',
    example: '1',
  })
  customerId: number;

  @ApiProperty({
    description: 'Code of department',
    type: 'string',
    example: '1919',
  })
  code: string;

  @ApiProperty({
    description: 'Name of department',
    type: 'string',
    example: 'Department',
  })
  name: string;

  @ApiProperty({
    description: 'Project of department',
    type: 'integer',
    example: '1',
    required: false,
  })
  project: string;

  // @ApiProperty({
  //   description: 'Id of department',
  //   type: 'integer',
  //   example: '1',
  // })
  // user: UserEntity;

  @ApiProperty({
    description: 'Id of department head',
    type: 'integer',
    example: '1',
  })
  userId: number;

  // @ApiProperty({
  //   description: 'Id of department',
  //   type: 'integer',
  //   example: '1',
  // })
  // deputyUser: UserEntity;

  @ApiProperty({
    description: 'Id of deputy',
    type: 'integer',
    example: '1',
  })
  deputyUserId: number;

  @ApiProperty({
    description: 'Status of department',
    type: 'boolean',
    example: 'false',
  })
  inactive: boolean;

  @ApiProperty({
    description: 'Change deputy mail',
    type: 'boolean',
    example: 'false',
  })
  deputyMail: boolean;

  @ApiProperty({
    description: 'Billing reference',
    type: 'string',
    example: 'No idea',
  })
  departmentBillingRef: string;
}

export class DepartmentResponseDto extends SuccessResponseDto {
  constructor(init: Pick<DepartmentResponseDto, 'total' | 'departments'>) {
    super();
    this.total = init.total;
    this.departments = init.departments;
  }
  @ApiProperty({
    description: 'Total count of departments.',
    type: 'integer',
    example: 162,
  })
  total: number;

  @ApiProperty({
    description: 'List of departments',
    type: DepartmentDto,
    isArray: true,
  })
  departments: DepartmentDto[];
}
