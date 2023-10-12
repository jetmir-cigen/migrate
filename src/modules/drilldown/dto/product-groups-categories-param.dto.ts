import { ProductCategoriesParamDto } from '@/modules/drilldown/dto/product-categories-param.dto';

export class ProductGroupsCategoriesParamDto extends ProductCategoriesParamDto {
  productCategoryId: number;
  productGroupId: number;
}
