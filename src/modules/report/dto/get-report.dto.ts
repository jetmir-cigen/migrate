import { IsDateAfter } from '@/common/validators/compare-dates.validator';
import { IsDateString } from 'class-validator';

export class ReportQueryDto {
  @IsDateString()
  fromDate: string;

  @IsDateString()
  @IsDateAfter('fromDate', { message: 'toDate must be after fromDate' })
  toDate: string;
}
