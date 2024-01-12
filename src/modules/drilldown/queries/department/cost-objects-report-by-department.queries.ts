import { QueryHandler } from '@nestjs/cqrs';
import {
  QueryHandlerInterface,
  QueryInterface,
} from '@/common/query.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerViewEntity } from '@/common/entities/customer-view.entity';
import { Repository } from 'typeorm';
import { DrillDownServiceType } from '@/modules/drilldown/dto';
import { DrillDownService } from '../../drilldown.service';
import { InvoiceRowViewEntity } from '@/common/views/invoice-row-view.entity';
import { DepartmentEntity } from '@/modules/department/entities/department.entity';
import { ManagerAccessDepartmentView } from '@/common/views';

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
    readonly user: Express.User,
  ) {}
}

@QueryHandler(GetCostObjectReportByDepartmentQuery)
export class GetCostObjectReportByDepartmentQueryHandler
  implements QueryHandlerInterface<GetCostObjectReportByDepartmentQuery>
{
  constructor(
    @InjectRepository(CustomerViewEntity)
    readonly customerViewRepository: Repository<CustomerViewEntity>,
    @InjectRepository(InvoiceRowViewEntity)
    readonly invoiceRowRepository: Repository<InvoiceRowViewEntity>,
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

    const query = this.invoiceRowRepository
      .createQueryBuilder('ir')
      .select('SUM(ir.amount)', 'amount')
      .addSelect('SUM(ir.salary_deduction_amount)', 'salaryDeductionAmount')
      .addSelect('ir.cost_object_id', 'costObjectId')
      .addSelect('ir.cost_object_name', 'costObjectName')

      .innerJoin(
        ManagerAccessDepartmentView,
        'd',
        'd.department_id = ir.departmentId',
      )
      .leftJoin(CustomerViewEntity, 'c', 'c.id = ir.customerId')
      .leftJoin(DepartmentEntity, 'd2', 'd2.id = d.department_id')
      .where('d.userId = :userId', { userId: user.uid })
      .andWhere(`d.department_id = :departmentId`, { departmentId })
      .andWhere(`ir.vendor_id != 1`)
      .andWhere(`ir.cost_object_type != 'C'`)
      .andWhere(`YEAR(ir.date) = :year`, { year });

    if (period > 0) {
      query.andWhere(`MONTH(ir.date) = :period`, { period });
    }

    if (frameAgreementId) {
      query.andWhere(`c.customer_head_frame_agreement_id = :frameAgreementId`, {
        frameAgreementId,
      });
    }

    if (customerHeadId) {
      query.andWhere(`c.customer_head_id = :customerHeadId`, {
        customerHeadId,
      });
    }

    if (customerId) {
      query.andWhere(`c.id = :customerId`, { customerId });
    }

    query.groupBy('ir.cost_object_id').orderBy('SUM(ir.amount)', 'DESC');

    const rowsPromise = query.getRawMany();

    const entityPromise = this.drillDownService.getEntity(
      user.uid,
      type,
      typeId,
    );

    const departmentPromise = this.departmentRepository.findOneOrFail({
      where: { id: departmentId },
    });

    const [rows, entity, department] = await Promise.all([
      rowsPromise,
      entityPromise,
      departmentPromise,
    ]);

    return {
      rows,
      entity,
      department,
    };
  }
}
