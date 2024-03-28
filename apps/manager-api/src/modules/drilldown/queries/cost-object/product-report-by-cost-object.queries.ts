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
  ProductEntity,
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
  costObject: any;
};

export class GetProductReportByCostObjectQuery implements QueryInterface {
  $$resolveType: ResultType;
  constructor(
    readonly filters: QueryFilters,
    readonly user: IUser,
  ) {}
}

@QueryHandler(GetProductReportByCostObjectQuery)
export class GetProductReportByCostObjectQueryHandler
  implements QueryHandlerInterface<GetProductReportByCostObjectQuery>
{
  constructor(
    @InjectRepository(CostObjectEntity)
    readonly coRepository: Repository<CostObjectEntity>,
    @InjectRepository(InvoiceRowEntity)
    readonly repository: Repository<InvoiceRowEntity>,
    readonly drillDownService: DrillDownService,
  ) {}
  async execute({
    filters,
    user,
  }: GetProductReportByCostObjectQuery): Promise<ResultType> {
    const { year, period, type, typeId, costObjectId } = filters;

    const { frameAgreementId, customerHeadId, customerId } =
      this.drillDownService.getTypes(type, typeId);

    const query = this.repository
      .createQueryBuilder('ir')
      .select('SUM(ir.amount)', 'amount')
      .addSelect('SUM(ir.salary_deduction_amount)', 'salaryDeductionAmount')
      .addSelect('ir.from_period', 'fromPeriod')
      .addSelect('ir.to_period', 'toPeriod')
      .addSelect('ir.quantity', 'quantity')
      .addSelect('p.id', 'productId')
      .addSelect('p.name', 'productName')
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
        'co.id = ir.cost_object_id AND co.type != "C" and co.id = :costObjectId',
        { costObjectId },
      )
      .innerJoin(ProductEntity, 'p', 'p.id = ir.product_id');

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

      query.innerJoin(DepartmentEntity, 'd', 'd.id = co.department_id');

      query.where(`d.id IN (:...departmentsAccessList)`, {
        departmentsAccessList,
      });
    }

    query.groupBy('p.id').orderBy('SUM(ir.amount)', 'DESC');

    const rowsPromise = query.getRawMany();

    const entityPromise = this.drillDownService.getEntity(user, type, typeId);

    const costObjectPromise = this.coRepository.findOne({
      where: { id: costObjectId },
      select: ['id', 'name', 'code'],
    });

    const [rows, entity, costObject] = await Promise.allSettled([
      rowsPromise,
      entityPromise,
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
      costObject: costObject.status === 'fulfilled' ? costObject.value : {},
    };
  }
}
