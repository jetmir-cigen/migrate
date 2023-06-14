import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateSetupExportSettingsDto {
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  hasVismaGlobal?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  hasVismaLonn?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  hasVismaLonnV2?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  hasVismaLonnV3?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  hasVismaPayroll?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  hasHuldtOgLillevik?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  hasHuldtOgLillevikSdv?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  hasSap?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  hasSapV2?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  hasTripletex?: boolean;

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
