import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class UpdateDepartmentDto {
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0,
  })
  @Min(1)
  id: number;

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
