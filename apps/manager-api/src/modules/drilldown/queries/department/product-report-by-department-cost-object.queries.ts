import { QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IUser } from '@skytech/auth';
import { QueryHandlerInterface, QueryInterface } from '@skytech/common';
import {
  CostObjectEntity,
  DepartmentEntity,
  InvoiceEntity,
  InvoiceRowEntity,
  ProductCategoryEntity,
  ProductEntity,
  ProductGroupEntity,
  VendorEntity,
} from '@skytech/db';
import { DrillDownServiceType } from '@skytech/manager/modules/drilldown/dto';
import { isDepartmentAdmin } from '@skytech/manager/utils/access';

import { DrillDownService } from '../../drilldown.service';

type QueryFilters = {
  year: number;
  period: number;
  type: DrillDownServiceType;
  typeId: number;
  departmentId: number;
  costObjectId: number;
};

type List = {
  amount: number;
  salaryDeductionAmount: number;
  productCategoryId: number;
  productCategoryName: string;
};

type ResultType = {
  rows: List[];
  entity: any;
  department: any;
  costObject: any;
};

export class GetProductReportByDepartmentAndCostObjectQuery
  implements QueryInterface
{
  $$resolveType: ResultType;
  constructor(
    readonly filters: QueryFilters,
    readonly user: IUser,
  ) {}
}

@QueryHandler(GetProductReportByDepartmentAndCostObjectQuery)
export class GetProductReportByDepartmentAndCostObjectQueryHandler
  implements
    QueryHandlerInterface<GetProductReportByDepartmentAndCostObjectQuery>
{
  constructor(
    @InjectRepository(InvoiceRowEntity)
    readonly repository: Repository<InvoiceRowEntity>,
    @InjectRepository(DepartmentEntity)
    readonly departmentRepository: Repository<DepartmentEntity>,
    @InjectRepository(CostObjectEntity)
    readonly costObjectRepository: Repository<CostObjectEntity>,
    readonly drillDownService: DrillDownService,
  ) {}
  async execute({
    filters,
    user,
  }: GetProductReportByDepartmentAndCostObjectQuery): Promise<ResultType> {
    const { year, period, type, typeId, departmentId, costObjectId } = filters;

    const { frameAgreementId, customerHeadId, customerId } =
      this.drillDownService.getTypes(type, typeId);

    const query = this.repository
      .createQueryBuilder('ir')
      .select('SUM(ir.amount)', 'amount')
      .addSelect('SUM(ir.salary_deduction_amount)', 'salaryDeductionAmount')
      .addSelect('ir.from_period', 'fromPeriod')
      .addSelect('ir.to_period', 'toPeriod')
      .addSelect('ir.quantity', 'quantity')
      .addSelect('pc.id', 'productCategoryId')
      .addSelect('pc.name', 'productCategoryName')
      .addSelect('pg.id', 'productGroupId')
      .addSelect('pg.name', 'productGroupName')
      .addSelect(
        'SUM(CASE WHEN ir.amount = 0 THEN 0 ELSE ir.quantity END)',
        'quantity',
      )
      .addSelect(
        'SUM(CASE WHEN ir.amount = 0 THEN 0 ELSE ir.peak_volume + ir.off_peak_volume END)',
        'peakVolumeDiff',
      )
      .addSelect(`DATE_FORMAT(MIN(ir.from_period), '%Y-%m-%d')`, 'fromPeriod')
      .addSelect(`DATE_FORMAT(MAX(ir.to_period), '%Y-%m-%d')`, 'toPeriod')
      .addSelect('p.price_type', 'priceType')
      .innerJoin(
        InvoiceEntity,
        'i',
        `i.id = ir.invoice_id ${this.drillDownService.getPeriodFilter(
          year,
          period,
        )}`,
      )
      .innerJoin(
        VendorEntity,
        'v',
        'v.id = i.vendor_id AND v.is_internal_vendor != 1',
      )
      .innerJoin(
        CostObjectEntity,
        'co',
        'co.id = ir.cost_object_id AND co.type != "C" AND co.id = :costObjectId',
        { costObjectId },
      )
      .innerJoin(
        DepartmentEntity,
        'd',
        'd.id = co.department_id AND d.id = :departmentId',
        { departmentId },
      )
      .innerJoin(ProductEntity, 'p', 'p.id = ir.product_id')
      .innerJoin(ProductGroupEntity, 'pg', 'pg.id = p.product_group_id')
      .innerJoin(ProductCategoryEntity, 'pc', 'pc.id = pg.product_category_id');

    this.drillDownService.getOrgFilterJoin(
      query,
      frameAgreementId,
      customerHeadId,
      customerId,
    );

    const isUserDepartmentAdmin = isDepartmentAdmin(user);

    if (!isUserDepartmentAdmin) {
      const customersAccessList =
        await this.drillDownService.getCustomerAccessListArr(user);
      query.where(`c.id IN (:...customersAccessList)`, { customersAccessList });
    } else {
      const departmentsAccessList =
        await this.drillDownService.getDepartmentAccessList(user.uid);

      query.where(`d.id IN (:...departmentsAccessList)`, {
        departmentsAccessList,
      });
    }

    query.groupBy('pg.id').orderBy('SUM(ir.amount)', 'DESC');

    const rowsPromise = query.getRawMany();

    const entityPromise = this.drillDownService.getEntity(user, type, typeId);

    const departmentPromise = this.departmentRepository.findOneOrFail({
      where: { id: departmentId },
    });

    const costObjectPromise = this.costObjectRepository.findOneOrFail({
      where: { id: costObjectId },
      select: ['id', 'name', 'code'],
    });

    const [rows, entity, department, costObject] = await Promise.allSettled([
      rowsPromise,
      entityPromise,
      departmentPromise,
      costObjectPromise,
    ]);

    return {
      rows:
        rows.status === 'fulfilled'
          ? rows.value.map((row) => ({
              ...row,
              peakVolumeDiff: Number(row.peakVolumeDiff),
            }))
          : [],
      entity: entity.status === 'fulfilled' ? entity.value : {},
      department: department.status === 'fulfilled' ? department.value : {},
      costObject: costObject.status === 'fulfilled' ? costObject.value : {},
    };
  }
}
