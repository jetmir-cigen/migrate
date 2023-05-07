import { SuccessResponseDto } from '@/common/dto/status-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class EmployeeConsentDto {
  @ApiProperty({
    description: 'Unique identifier of the consent',
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: true,
    description: 'Whether the consent is global',
  })
  isGlobal: boolean;

  @ApiProperty({
    example: 'I agree to...',
    description: 'Consent content',
  })
  text: string;

  @ApiProperty({
    example: '2022-02-01',
    description: 'Consent creation date',
  })
  createdDate: Date;

  @ApiProperty({
    example: 2,
    description: 'Unique identifier of the user who created the consent',
  })
  createdUserId: number;

  @ApiProperty({
    example: 'John Smith',
    description: 'Name of the user who created the consent',
  })
  createdUserName: string;

  @ApiProperty({
    example: 'I agree to...',
    description: 'Consent content',
  })
  consentsGiven: number;
}

export class EmployeeConsentListResponseDto extends SuccessResponseDto {
  constructor(init: Pick<EmployeeConsentListResponseDto, 'employeeConsents'>) {
    super();
    this.employeeConsents = init.employeeConsents;
  }

  @ApiProperty({
    description: 'List of employee consents',
    type: EmployeeConsentDto,
    isArray: true,
  })
  employeeConsents: EmployeeConsentDto[];
}
