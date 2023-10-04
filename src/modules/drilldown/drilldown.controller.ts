import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetTotalQuery } from '@/modules/drilldown/queries/get-total.query';
import { ProductCategoriesParamDto } from '@/modules/drilldown/dto/product-categories-param.dto';
import { AuthGuard } from '@/modules/auth/auth.guard';
import { ADMIN_USERS_GROUP } from '@/modules/user/user-role.groups';
import { UserRoleGuard } from '@/modules/user/user-role.guard';
import { GetProductCategoriesQuery } from '@/modules/drilldown/queries/get-product-categories.queries';
import { AuthUser } from '@/modules/auth/auth-user.decorator';

@Controller('drilldown')
@UseGuards(AuthGuard, UserRoleGuard([...ADMIN_USERS_GROUP]))
export class DrillDownController {
  constructor(readonly queryBus: QueryBus) {}
  @Get('/total/:year/:period')
  async getTotal(@Param() { year, period }): Promise<any> {
    return this.queryBus.execute(new GetTotalQuery({ year, period }));
  }

  @Get('/:type/:typeId/:year/:period')
  async getProductCategories(
    @Param() { type, typeId, year, period }: ProductCategoriesParamDto,
    @AuthUser() user: Express.User,
  ): Promise<any> {
    return this.queryBus.execute(
      new GetProductCategoriesQuery({ type, typeId, year, period }, user),
    );
  }
}
