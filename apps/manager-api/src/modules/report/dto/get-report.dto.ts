import { IsDateAfter } from '@skytech/manager/common/validators/compare-dates.validator';
import { IsBoolean, IsDateString, IsInt } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class QueryFilter {
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isGlobal?: boolean;
}

export class ReportQueryDto extends QueryFilter {
  @IsDateString()
  fromDate: string;

  @IsDateString()
  @IsDateAfter('fromDate', { message: 'toDate must be after fromDate' })
  toDate: string;
}

export class TaxAdvantageQueryDto extends QueryFilter {
  @IsInt()
  @Type(() => Number)
  year: number;
}
