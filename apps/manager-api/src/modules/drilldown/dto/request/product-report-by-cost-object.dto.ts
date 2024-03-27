import { IsEnum, IsNumberString } from 'class-validator';

import { DrillDownServiceType } from '../../types';

export class GetProductReportByCostObjectQueryDto {
  @IsEnum(DrillDownServiceType)
  type: DrillDownServiceType;

  @IsNumberString()
  typeId: number;

  @IsNumberString()
  year: number;

  @IsNumberString()
  period: number;

  @IsNumberString()
  costObjectId: number;
}
