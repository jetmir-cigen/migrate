import { IsEnum, IsNumberString } from 'class-validator';
import { DrillDownServiceType } from '../../types';

export class GetCostObjectReportByProductGroupAndCategoryQueryDto {
  @IsEnum(DrillDownServiceType)
  type: DrillDownServiceType;

  @IsNumberString()
  typeId: number;

  @IsNumberString()
  year: number;

  @IsNumberString()
  period: number;

  @IsNumberString()
  productCategoryId: number;

  @IsNumberString()
  productGroupId: number;

  @IsNumberString()
  productId: number;
}
