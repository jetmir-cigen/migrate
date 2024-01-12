import { IsEnum, IsNumberString } from 'class-validator';

export enum DrillDownServiceType {
  FRAME_AGREEMENT = 'frame-agreement',
  CUSTOMER_HEAD = 'customer-head',
  CUSTOMER = 'customer',
}

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
