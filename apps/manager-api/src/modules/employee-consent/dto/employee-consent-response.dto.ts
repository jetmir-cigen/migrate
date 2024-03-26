import { ApiProperty } from '@nestjs/swagger';
import { CustomerEntity, CustomerHeadEntity, UserEntity } from '@skytech/db';

export class EmployeeConsentDto {
  @ApiProperty({
    description: 'Unique identifier of the consent',
    example: 1,
  })
  id: number;

  @ApiProperty({
    nullable: true,
    example: true,
    description: `Author's customer head if present`,
  })
  customerHead: CustomerHeadEntity | null;

  @ApiProperty({
    nullable: true,
    example: true,
    description: `Author's customer`,
  })
  customer: CustomerEntity | null;

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
    nullable: true,
    example: 2,
    description: `Author's user`,
  })
  user: UserEntity | null;

  @ApiProperty({
    example: 2,
    description: 'Number of given consents',
  })
  consentsGiven: number;
}

export class EmployeeConsentListResponseDto {
  constructor(init: Pick<EmployeeConsentListResponseDto, 'employeeConsents'>) {
    this.employeeConsents = init.employeeConsents;
  }

  @ApiProperty({
    description: 'List of employee consents',
    type: EmployeeConsentDto,
    isArray: true,
  })
  employeeConsents: EmployeeConsentDto[];
}

export class EmployeeConsentResponseDto {
  constructor(init: Pick<EmployeeConsentResponseDto, 'employeeConsent'>) {
    this.employeeConsent = init.employeeConsent;
  }

  @ApiProperty({
    description: 'Employee consents',
    type: EmployeeConsentDto,
  })
  employeeConsent: EmployeeConsentDto;
}
