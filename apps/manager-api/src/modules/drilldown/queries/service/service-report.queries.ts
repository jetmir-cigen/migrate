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
};

export class ServiceReportQuery implements QueryInterface {
  $$resolveType: ResultType;
  constructor(
    readonly filters: QueryFilters,
    readonly user: IUser,
  ) {}
}

@QueryHandler(ServiceReportQuery)
export class ServiceReportQueryHandler
  implements QueryHandlerInterface<ServiceReportQuery>
{
  constructor(
    @InjectRepository(InvoiceRowEntity)
    readonly repository: Repository<InvoiceRowEntity>,
    readonly drillDownService: DrillDownService,
  ) {}
  async execute({ filters, user }: ServiceReportQuery): Promise<ResultType> {
    const { year, period, type, typeId } = filters;

    const { frameAgreementId, customerHeadId, customerId } =
      this.drillDownService.getTypes(type, typeId);

    const query = this.repository
      .createQueryBuilder('ir')
      .select('SUM(ir.amount)', 'amount')
      .addSelect('SUM(ir.salary_deduction_amount)', 'salaryDeductionAmount')
      .addSelect('pc.id', 'productCategoryId')
      .addSelect('pc.name', 'productCategoryName')
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
      .innerJoin(ProductEntity, 'p', 'p.id = ir.product_id')
      .innerJoin(ProductGroupEntity, 'pg', 'pg.id = p.product_group_id')
      .innerJoin(ProductCategoryEntity, 'pc', 'pc.id = pg.product_category_id')
      .innerJoin(
        CostObjectEntity,
        'co',
        'co.id = ir.cost_object_id AND co.type != "C"',
      );

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

    query.groupBy('pc.id').orderBy('SUM(ir.amount)', 'DESC');

    const rowsPromise = query.getRawMany();

    const entityPromise = this.drillDownService.getEntity(user, type, typeId);

    const [rows, entity] = await Promise.allSettled([
      rowsPromise,
      entityPromise,
    ]);

    return {
      rows: rows.status === 'fulfilled' ? rows.value : [],
      entity: entity.status === 'fulfilled' ? entity.value : {},
    };
  }
}
