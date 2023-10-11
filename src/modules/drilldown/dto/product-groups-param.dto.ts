import { ProductCategoriesParamDto } from './product-categories-param.dto';
import { IsNumber } from 'class-validator';

export class ProductGroupsParamDto extends ProductCategoriesParamDto {
  @IsNumber()
  productCategoryId: number;
}
