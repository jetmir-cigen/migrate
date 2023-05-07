import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateEmployeeConsentDto {
  @ApiProperty({
    description: 'Unique identifier of the consent',
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 'I agree to...',
    description: 'Consent content',
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  text?: string;

  @ApiProperty({
    example: 2,
    description: 'Customer id',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  customerId?: number;

  @ApiProperty({
    example: 2,
    description: 'Customer head id',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  customerHeadId?: number;

  @ApiProperty({
    example: 2,
    description: 'Crated user id',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  createdUserId?: number;

  @ApiProperty({
    description: 'Consent creation date',
    example: '2022-02-01',
  })
  createdDate?: Date;
}
