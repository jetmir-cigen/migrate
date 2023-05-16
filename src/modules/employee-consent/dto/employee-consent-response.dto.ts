import { SuccessResponseDto } from '@/common/dto/status-response.dto';
import { CustomerHeadEntity } from '@/common/entities/customer-head.entity';
import { CustomerEntity } from '@/modules/customer/entities/customer.entity';
import { UserEntity } from '@/modules/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class EmployeeConsentDto {
  @ApiProperty({
    description: 'Unique identifier of the consent',
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: true,
    description: `Unique identifier of the author's customer head if present`,
  })
  customerHead: CustomerHeadEntity;

  @ApiProperty({
    example: true,
    description: `Unique identifier of the author's customer head if present`,
  })
  customer: CustomerEntity;

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
  user: UserEntity;

  @ApiProperty({
    example: 2,
    description: 'Number of given consents',
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
