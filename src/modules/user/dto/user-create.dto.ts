import { IsString, IsNotEmpty, IsEmail, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserCreateDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  // @Matches(/^\+?[1-9]\d{1,14}$/) // Matches a phone number with maximum length of 15 digits, optionally starting with '+'
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsInt()
  @IsNotEmpty()
  countryId: number;

  @IsInt()
  @IsNotEmpty()
  userGroupId: number;

  @IsInt()
  @IsNotEmpty()
  customerId: number;
}
