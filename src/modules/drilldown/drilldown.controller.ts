import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetTotalQuery } from '@/modules/drilldown/queries/get-total.query';
import { ProductCategoriesParamDto } from '@/modules/drilldown/dto/product-categories-param.dto';
import { AuthGuard } from '@/modules/auth/auth.guard';
import { ADMIN_USERS_GROUP } from '@/modules/user/user-role.groups';
import { UserRoleGuard } from '@/modules/user/user-role.guard';
import { GetProductCategoriesQuery } from '@/modules/drilldown/queries/get-product-categories.queries';
import { AuthUser } from '@/modules/auth/auth-user.decorator';
import { ProductGroupsParamDto } from '@/modules/drilldown/dto/product-groups-param.dto';
import { GetProductGroupsQuery } from '@/modules/drilldown/queries/get-product-groups.query';
import {
  ListTotalDto,
  ListProductCategoriesDto,
  ProductGroupsListDto,
} from './dto';

@Controller('drilldown')
@UseGuards(AuthGuard, UserRoleGuard([...ADMIN_USERS_GROUP]))
export class DrillDownController {
  constructor(readonly queryBus: QueryBus) {}
  @Get('/total/:year/:period')
  async getTotal(@Param() { year, period }): Promise<ListTotalDto[]> {
    return this.queryBus.execute(new GetTotalQuery({ year, period }));
  }

  @Get('/:type/:typeId/:year/:period')
  async getProductCategories(
    @Param() params: ProductCategoriesParamDto,
    @AuthUser() user: Express.User,
  ): Promise<ListProductCategoriesDto[]> {
    return this.queryBus.execute(new GetProductCategoriesQuery(params, user));
  }

  @Get('/:type/:typeId/:year/:period/categories/:productCategoryId')
  async getProductGroups(
    @Param()
    params: ProductGroupsParamDto,
    @AuthUser() user: Express.User,
  ): Promise<ProductGroupsListDto[]> {
    return this.queryBus.execute(new GetProductGroupsQuery(params, user));
  }
}
