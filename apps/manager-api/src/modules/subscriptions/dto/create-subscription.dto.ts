import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSubscriptionDto {
  @IsBoolean()
  @ApiProperty()
  isBusinessSub: boolean;

  @IsBoolean()
  @ApiProperty()
  isNewNumber: boolean;

  @IsString()
  @ApiProperty()
  contactNumber: string;

  @IsNumber()
  @ApiProperty()
  contactNumberCountryId: number;

  @IsString()
  @ApiProperty()
  activationDate: string;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  email?: string;

  @IsBoolean()
  @ApiProperty()
  @IsOptional()
  isNewSim?: boolean;

  @IsString()
  @ApiProperty()
  @IsOptional()
  employeeNumber?: string;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  authorizationDocumentId?: number;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  departmentId?: number;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  devicePolicyId?: number;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  telePolicyId?: number;

  @IsArray()
  @ApiProperty()
  @IsOptional()
  ecomPolicyIds?: number[];

  @IsString()
  @ApiProperty()
  @IsOptional()
  simNumber?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  comment?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  simZip?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  simCity?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  simAddress?: string;
}
