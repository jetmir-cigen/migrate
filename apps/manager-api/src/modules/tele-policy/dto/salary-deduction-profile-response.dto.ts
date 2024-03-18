import { ApiProperty } from '@nestjs/swagger';
import { CustomerDto } from '@skytech/manager/modules/customer/dto/customer.dto';
import { TelePolicyTemplateDto } from './tele-policy-template.dto';
import { SuccessResponseDto } from '@skytech/manager/common/dto/status-response.dto';
import { CostObjectDto } from '@skytech/manager/common/dto/cost-object.dto';

export class SalaryDeductionProfileDto {
  @ApiProperty({
    example: 1,
    description: 'The ID of the salary deduction profile.',
  })
  id: number;

  @ApiProperty({
    example: 'Profile Name',
    description: 'The name of the salary deduction profile.',
    maxLength: 100,
  })
  name: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the associated customer.',
  })
  customerId: number;

  @ApiProperty({
    type: CustomerDto,
    description: 'The associated customer.',
  })
  customer: CustomerDto;

  @ApiProperty({ example: 1, description: 'The ID of the customer head.' })
  customerHeadId: number;

  @ApiProperty({ type: CustomerDto, description: 'The customer head.' })
  customerHead: CustomerDto;

  @ApiProperty({
    example: 1000.0,
    description: 'The amount of free allowance.',
    type: 'number',
    minimum: 0,
    maximum: 9999999999.99,
    default: 0.0,
  })
  freeAllowanceAmount: number;

  @ApiProperty({
    example: 'Profile comment',
    description: 'Additional comment for the profile.',
    nullable: true,
  })
  comment: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the associated tele policy template.',
  })
  telePolicyTemplateId: number;

  @ApiProperty({
    type: TelePolicyTemplateDto,
    description: 'The associated tele policy template.',
  })
  telePolicyTemplate: TelePolicyTemplateDto;

  @ApiProperty({
    type: CostObjectDto,
    description: 'Cost objects associated with the salary deduction profile.',
  })
  costObjects?: CostObjectDto;

  @ApiProperty({
    example: 1,
    description: 'The count of subscribers associated with the profile.',
  })
  subscribers: number;
}

export class SalaryDeductionProfileListResponseDto extends SuccessResponseDto {
  constructor(
    init: Pick<
      SalaryDeductionProfileListResponseDto,
      'salaryDeductionProfiles'
    >,
  ) {
    super();
    this.salaryDeductionProfiles = init.salaryDeductionProfiles;
  }

  @ApiProperty({
    description: 'List of salary deduction profiles',
    type: SalaryDeductionProfileDto,
    isArray: true,
  })
  salaryDeductionProfiles: SalaryDeductionProfileDto[];
}

export class SalaryDeductionProfileResponseDto extends SuccessResponseDto {
  constructor(
    init: Pick<SalaryDeductionProfileResponseDto, 'salaryDeductionProfile'>,
  ) {
    super();
    this.salaryDeductionProfile = init.salaryDeductionProfile;
  }

  @ApiProperty({
    description: 'SalaryDeductionProfile ',
    type: SalaryDeductionProfileDto,
  })
  salaryDeductionProfile: SalaryDeductionProfileDto;
}
