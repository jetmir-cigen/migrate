import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  code: string;

  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsNumber()
  deputyUserId?: number;

  @IsOptional()
  @IsString()
  project?: string;

  @IsOptional()
  @IsBoolean()
  deputyMail?: boolean;

  @IsOptional()
  @IsBoolean()
  inactive?: boolean;
}
