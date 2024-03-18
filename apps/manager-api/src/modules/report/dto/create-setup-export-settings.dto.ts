import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateSetupExportSettingsDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  salaryDeductionCodeDevice?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  salaryDeductionCodeUsage?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  salaryDeductionCodeBuyout?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  projectDevice?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  projectUsage?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  departmentOverrideDevice?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  departmentOverrideUsage?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  departmentOverrideBuyout?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  departmentOverrideBuyoutUsage?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  departmentOverrideBuyoutDevice?: string;
}
