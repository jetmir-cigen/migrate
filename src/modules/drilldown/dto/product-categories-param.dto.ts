import { IsNumber, IsEnum } from 'class-validator';

export enum DrillDownServiceType {
  FRAME_AGREEMENT = 'frame-agreement',
  CUSTOMER_HEAD = 'customer-head',
  CUSTOMER = 'customer',
}

export class ProductCategoriesParamDto {
  @IsEnum(DrillDownServiceType)
  type: DrillDownServiceType;

  @IsNumber()
  typeId: number;

  @IsNumber()
  year: number;

  @IsNumber()
  period: number;
}
