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
import { CostObjectEntity } from '@/common/entities/cost-object.entity';

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
    readonly user: Express.User,
  ) {}
}

@QueryHandler(GetProductReportByDepartmentAndCostObjectQuery)
export class GetProductReportByDepartmentAndCostObjectQueryHandler
  implements
    QueryHandlerInterface<GetProductReportByDepartmentAndCostObjectQuery>
{
  constructor(
    @InjectRepository(CustomerViewEntity)
    readonly customerViewRepository: Repository<CustomerViewEntity>,
    @InjectRepository(InvoiceRowViewEntity)
    readonly invoiceRowRepository: Repository<InvoiceRowViewEntity>,
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

    const query = this.invoiceRowRepository
      .createQueryBuilder('ir')
      .select('SUM(ir.amount)', 'amount')
      .addSelect('SUM(ir.salary_deduction_amount)', 'salaryDeductionAmount')
      .addSelect('ir.from_period', 'fromPeriod')
      .addSelect('ir.to_period', 'toPeriod')
      .addSelect('ir.quantity', 'quantity')
      .addSelect('ir.product_category_id', 'productCategoryId')
      .addSelect('ir.product_category_name', 'productCategoryName')
      .addSelect('ir.product_group_id', 'productGroupId')
      .addSelect('ir.product_group_name', 'productGroupName')

      .innerJoin(
        ManagerAccessDepartmentView,
        'd',
        'd.department_id = ir.departmentId',
      )
      .leftJoin(CustomerViewEntity, 'c', 'c.id = ir.customerId')
      .leftJoin(DepartmentEntity, 'd2', 'd2.id = d.department_id')
      .where('d.userId = :userId', { userId: user.uid })
      .andWhere(`d.department_id = :departmentId`, { departmentId })
      .andWhere(`ir.cost_object_id = :costObjectId`, { costObjectId })
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

    query.groupBy('ir.product_group_id').orderBy('SUM(ir.amount)', 'DESC');

    const rowsPromise = query.getRawMany();

    const entityPromise = this.drillDownService.getEntity(
      user.uid,
      type,
      typeId,
    );

    const departmentPromise = this.departmentRepository.findOneOrFail({
      where: { id: departmentId },
    });

    const costObjectPromise = this.costObjectRepository.findOneOrFail({
      where: { id: costObjectId },
      select: ['id', 'name', 'code'],
    });

    const [rows, entity, department, costObject] = await Promise.all([
      rowsPromise,
      entityPromise,
      departmentPromise,
      costObjectPromise,
    ]);

    return {
      rows,
      entity,
      department,
      costObject,
    };
  }
}
