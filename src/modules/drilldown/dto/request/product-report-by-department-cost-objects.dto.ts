import { IsEnum, IsNumberString } from 'class-validator';
import { DrillDownServiceType } from '../../types';

export class GetProductsReportByDepartmentAndCostObjectsQueryDto {
  @IsEnum(DrillDownServiceType)
  type: DrillDownServiceType;

  @IsNumberString()
  typeId: number;

  @IsNumberString()
  year: number;

  @IsNumberString()
  period: number;

  @IsNumberString()
  departmentId: number;

  @IsNumberString()
  costObjectId: number;
}
