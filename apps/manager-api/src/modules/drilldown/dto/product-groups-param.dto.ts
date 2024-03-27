import { IsNumberString } from 'class-validator';

import { ProductCategoriesParamDto } from './product-categories-param.dto';

export class ProductGroupsParamDto extends ProductCategoriesParamDto {
  @IsNumberString()
  productCategoryId: number;
}
