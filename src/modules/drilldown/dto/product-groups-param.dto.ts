import { ProductCategoriesParamDto } from './product-categories-param.dto';
import { IsNumberString } from 'class-validator';

export class ProductGroupsParamDto extends ProductCategoriesParamDto {
  @IsNumberString()
  productCategoryId: number;
}
