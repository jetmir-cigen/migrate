import { IsNumberString } from 'class-validator';

import { ProductGroupsParamDto } from './product-groups-param.dto';

export class ProductGroupsCategoriesParamDto extends ProductGroupsParamDto {
  @IsNumberString()
  productGroupId: number;
}
