import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsDateString, IsInt } from 'class-validator';

import { IsDateAfter } from '@skytech/common';

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
