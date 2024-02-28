import { QueryHandler } from '@nestjs/cqrs';
import {
  QueryHandlerInterface,
  QueryInterface,
} from '@/common/query.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DrillDownServiceType } from '@/modules/drilldown/dto';
import { DrillDownService } from '../../drilldown.service';
import { DepartmentEntity } from '@/modules/department/entities/department.entity';
import { InvoiceRowEntity } from '@/modules/invoice/entities/invoice-row.entity';
import { InvoiceEntity } from '@/modules/invoice/entities/invoice.entity';
import { VendorEntity } from '@/common/entities/vendor.entity';
import { CostObjectEntity } from '@/common/entities/cost-object.entity';
import { isDepartmentAdmin } from '@/utils/access';

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

export class GetReportByDepartmentQuery implements QueryInterface {
  $$resolveType: ResultType;
  constructor(readonly filters: QueryFilters, readonly user: Express.User) {}
}

@QueryHandler(GetReportByDepartmentQuery)
export class GetReportByDepartmentQueryHandler
  implements QueryHandlerInterface<GetReportByDepartmentQuery>
{
  constructor(
    @InjectRepository(InvoiceRowEntity)
    readonly repository: Repository<InvoiceRowEntity>,
    readonly drillDownService: DrillDownService,
  ) {}
  async execute({
    filters,
    user,
  }: GetReportByDepartmentQuery): Promise<ResultType> {
    const { year, period, type, typeId } = filters;

    const { frameAgreementId, customerHeadId, customerId } =
      this.drillDownService.getTypes(type, typeId);

    const query = this.repository
      .createQueryBuilder('ir')
      .select('SUM(ir.amount)', 'amount')
      .addSelect('SUM(ir.salary_deduction_amount)', 'salaryDeductionAmount')
      .addSelect('d.id', 'departmentId')
      .addSelect('d.name', 'departmentName')
      .addSelect('d.code', 'departmentCode')
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
      .innerJoin(DepartmentEntity, 'd', 'd.id = co.department_id');

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

    query.groupBy('d.id').orderBy('SUM(ir.amount)', 'DESC');

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
