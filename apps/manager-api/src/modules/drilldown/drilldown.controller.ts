import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';

import {
  ADMIN_USERS_GROUP,
  AuthGuard,
  AuthUser,
  DEPARTMENT_USERS_GROUP,
  IUser,
  SUPER_ADMIN_USERS_GROUP,
  UserRoles,
} from '@skytech/auth';
import { GetTotalQuery } from '@skytech/manager/modules/drilldown/queries/get-total.query';
import { ServiceReportQuery } from '@skytech/manager/modules/drilldown/queries/service/service-report.queries';
import { QueryService } from '@skytech/manager/modules/query/query.service';

import { GetCostObjectReportByProductGroupAndCategoryQueryDto } from './dto/request/cost-object-report-by-product-group-categories.dto';
import { GetCostObjectsReportByDepartmentQueryDto } from './dto/request/cost-objects-report-by-department.dto';
import { GetTotalQueryDto } from './dto/request/get-total.dto';
import { GetProductReportByCostObjectQueryDto } from './dto/request/product-report-by-cost-object.dto';
import { GetProductsReportByDepartmentAndCostObjectsQueryDto } from './dto/request/product-report-by-department-cost-objects.dto';
import { GetReportByCostObjectQueryDto } from './dto/request/report-by-cost-object.dto';
import { GetReportByDepartmentQueryDto } from './dto/request/report-by-department.dto';
import { GetReportByProductGroupAndCategoryQueryDto } from './dto/request/report-by-product-group-categories.dto';
import { GetReportByServiceQueryDto } from './dto/request/report-by-service.dto';
import { GetReportByServiceAndProductCategoryQueryDto } from './dto/request/report-by-service-and-prodcut-category.dto';
import { GetReportByCostObjectQuery } from './queries/cost-object/get-report-by-cost-object.queries';
import { GetProductReportByCostObjectQuery } from './queries/cost-object/product-report-by-cost-object.queries';
import { GetCostObjectReportByDepartmentQuery } from './queries/department/cost-objects-report-by-department.queries';
import { GetReportByDepartmentQuery } from './queries/department/get-report-by-department.queries';
import { GetProductReportByDepartmentAndCostObjectQuery } from './queries/department/product-report-by-department-cost-object.queries';
import { CostObjectsServiceCategoryAndGroupReportQuery } from './queries/service/cost-objects-service-category-and-group-report.queries';
import { ServiceCategoryAndGroupReportQuery } from './queries/service/service-category-and-group-report.queries';
import { ServiceProductCategoryReportQuery } from './queries/service/service-product-category-report.queries';
import { ListProductCategoriesDto, ListTotalDto } from './dto';

@Controller('drill-down')
@UseGuards(
  AuthGuard([
    ...ADMIN_USERS_GROUP,
    ...DEPARTMENT_USERS_GROUP,
    UserRoles.REPORT_USER,
  ]),
)
export class DrillDownController {
  constructor(readonly queryService: QueryService) {}

  @Get('service/category/groups/cost-objects')
  async getCostObjectReportByProductCategoryAndGroup(
    @Query() params: GetCostObjectReportByProductGroupAndCategoryQueryDto,
    @AuthUser() user: IUser,
  ): Promise<ListProductCategoriesDto> {
    return await this.queryService.execute(
      new CostObjectsServiceCategoryAndGroupReportQuery(params, user),
    );
  }

  @Get('service/category/groups')
  async getReportByProductCategoryAndGroup(
    @Query() params: GetReportByProductGroupAndCategoryQueryDto,
    @AuthUser() user: IUser,
  ): Promise<ListProductCategoriesDto> {
    return await this.queryService.execute(
      new ServiceCategoryAndGroupReportQuery(params, user),
    );
  }

  @Get('service/category')
  async getReportByProductCategory(
    @Query() params: GetReportByServiceAndProductCategoryQueryDto,
    @AuthUser() user: IUser,
  ): Promise<ListProductCategoriesDto> {
    return await this.queryService.execute(
      new ServiceProductCategoryReportQuery(params, user),
    );
  }

  // Create a get method for getting report by service (src/modules/drilldown/queries/get-report-by-service.queries.ts)
  // and instead of route params use query params
  @Get('service')
  async getReportByService(
    @Query() params: GetReportByServiceQueryDto,
    @AuthUser() user: IUser,
  ): Promise<ListProductCategoriesDto> {
    return await this.queryService.execute(
      new ServiceReportQuery(params, user),
    );
  }

  @Get('department/cost-objects/products')
  async getProductReportByDepartmentAndCostObjects(
    @Query() params: GetProductsReportByDepartmentAndCostObjectsQueryDto,
    @AuthUser() user: IUser,
  ): Promise<ListProductCategoriesDto> {
    return await this.queryService.execute(
      new GetProductReportByDepartmentAndCostObjectQuery(params, user),
    );
  }

  @Get('department/cost-objects')
  async getCostObjectsReportByDepartment(
    @Query() params: GetCostObjectsReportByDepartmentQueryDto,
    @AuthUser() user: IUser,
  ): Promise<ListProductCategoriesDto> {
    console.log(params);

    return await this.queryService.execute(
      new GetCostObjectReportByDepartmentQuery(params, user),
    );
  }

  @Get('department')
  async getReportByDepartment(
    @Query() params: GetReportByDepartmentQueryDto,
    @AuthUser() user: IUser,
  ): Promise<ListProductCategoriesDto> {
    console.log(params);

    return await this.queryService.execute(
      new GetReportByDepartmentQuery(params, user),
    );
  }

  @Get('cost-object/products')
  async getProductReportByCostObject(
    @Query() params: GetProductReportByCostObjectQueryDto,
    @AuthUser() user: IUser,
  ): Promise<ListProductCategoriesDto> {
    console.log(params);

    return await this.queryService.execute(
      new GetProductReportByCostObjectQuery(params, user),
    );
  }

  @Get('cost-object')
  async getReportByCostObject(
    @Query() params: GetReportByCostObjectQueryDto,
    @AuthUser() user: IUser,
  ): Promise<ListProductCategoriesDto> {
    console.log(params);

    return await this.queryService.execute(
      new GetReportByCostObjectQuery(params, user),
    );
  }

  @UseGuards(AuthGuard([...SUPER_ADMIN_USERS_GROUP]))
  @Get('total')
  async getTotalQuery(
    @Query() params: GetTotalQueryDto,
    @AuthUser() user: IUser,
  ): Promise<ListTotalDto[]> {
    return this.queryService.execute(new GetTotalQuery({ ...params, user }));
  }

  @Get('/total/:year/:period')
  async getTotal(
    @Param() { year, period },
    @AuthUser() user: IUser,
  ): Promise<ListTotalDto[]> {
    return this.queryService.execute(new GetTotalQuery({ year, period, user }));
  }
}
