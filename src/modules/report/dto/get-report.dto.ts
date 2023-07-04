import { IsDateAfter } from '@/common/validators/compare-dates.validator';
import { IsDateString, IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class ReportQueryDto {
  @IsDateString()
  fromDate: string;

  @IsDateString()
  @IsDateAfter('fromDate', { message: 'toDate must be after fromDate' })
  toDate: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  year?: number;
}
