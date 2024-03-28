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
};

export class GetCostObjectReportByDepartmentQuery implements QueryInterface {
  $$resolveType: ResultType;
  constructor(
    readonly filters: QueryFilters,
    readonly user: IUser,
  ) {}
}

@QueryHandler(GetCostObjectReportByDepartmentQuery)
export class GetCostObjectReportByDepartmentQueryHandler
  implements QueryHandlerInterface<GetCostObjectReportByDepartmentQuery>
{
  constructor(
    @InjectRepository(InvoiceRowEntity)
    readonly repository: Repository<InvoiceRowEntity>,
    @InjectRepository(DepartmentEntity)
    readonly departmentRepository: Repository<DepartmentEntity>,
    readonly drillDownService: DrillDownService,
  ) {}
  async execute({
    filters,
    user,
  }: GetCostObjectReportByDepartmentQuery): Promise<ResultType> {
    const { year, period, type, typeId, departmentId } = filters;

    const { frameAgreementId, customerHeadId, customerId } =
      this.drillDownService.getTypes(type, typeId);

    const query = this.repository
      .createQueryBuilder('ir')
      .select('SUM(ir.amount)', 'amount')
      .addSelect('SUM(ir.salary_deduction_amount)', 'salaryDeductionAmount')
      .addSelect('co.id', 'costObjectId')
      .addSelect('co.name', 'costObjectName')
      .addSelect('co.code', 'costObjectCode')
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
        'co.id = ir.cost_object_id AND co.type != "C"',
      )
      .innerJoin(
        DepartmentEntity,
        'd',
        'd.id = co.department_id AND d.id = :departmentId',
        { departmentId },
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

      query.where(`d.id IN (:...departmentsAccessList)`, {
        departmentsAccessList,
      });
    }
    query.groupBy('co.id').orderBy('SUM(ir.amount)', 'DESC');

    const rowsPromise = query.getRawMany();

    const entityPromise = this.drillDownService.getEntity(user, type, typeId);

    const departmentPromise = this.departmentRepository.findOneOrFail({
      where: { id: departmentId },
    });

    const [rows, entity, department] = await Promise.allSettled([
      rowsPromise,
      entityPromise,
      departmentPromise,
    ]);

    return {
      rows: rows.status === 'fulfilled' ? rows.value : [],
      entity: entity.status === 'fulfilled' ? entity.value : {},
      department: department.status === 'fulfilled' ? department.value : {},
    };
  }
}
