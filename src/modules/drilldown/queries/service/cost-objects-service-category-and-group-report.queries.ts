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

type QueryFilters = {
  year: number;
  period: number;
  type: DrillDownServiceType;
  typeId: number;
  productId: number;
  productCategoryId: number;
  productGroupId: number;
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
  category: any;
  group: any;
};

export class CostObjectsServiceCategoryAndGroupReportQuery
  implements QueryInterface
{
  $$resolveType: ResultType;
  constructor(
    readonly filters: QueryFilters,
    readonly user: Express.User,
  ) {}
}

@QueryHandler(CostObjectsServiceCategoryAndGroupReportQuery)
export class CostObjectsServiceCategoryAndGroupReportQueryHandler
  implements
    QueryHandlerInterface<CostObjectsServiceCategoryAndGroupReportQuery>
{
  constructor(
    @InjectRepository(CustomerViewEntity)
    readonly customerViewRepository: Repository<CustomerViewEntity>,
    @InjectRepository(InvoiceRowViewEntity)
    readonly invoiceRowRepository: Repository<InvoiceRowViewEntity>,
    readonly drillDownService: DrillDownService,
  ) {}
  async execute({
    filters,
    user,
  }: CostObjectsServiceCategoryAndGroupReportQuery): Promise<ResultType> {
    const {
      year,
      period,
      type,
      typeId,
      productId,
      productCategoryId,
      productGroupId,
    } = filters;

    const { frameAgreementId, customerHeadId, customerId } =
      this.drillDownService.getTypes(type, typeId);

    const customersAccessList =
      await this.drillDownService.getCustomerAccessListArr(user.uid);

    const query = this.invoiceRowRepository
      .createQueryBuilder('ir')
      .select('SUM(ir.amount)', 'amount')
      .addSelect('SUM(ir.salary_deduction_amount)', 'salaryDeductionAmount')
      .addSelect('ir.cost_object_id', 'costObjectId')
      .addSelect('ir.cost_object_name', 'costObjectName')
      .addSelect('ir.from_period', 'fromPeriod')
      .addSelect('ir.to_period', 'toPeriod')
      .addSelect('ir.quantity', 'quantity')
      .innerJoin(CustomerViewEntity, 'c', 'c.id = ir.customer_id')
      .where(`c.id IN (:...customersAccessList)`, { customersAccessList })
      .andWhere(`ir.vendor_id != 1`)
      .andWhere(`ir.cost_object_type != 'C'`)
      .andWhere('ir.product_id = :productId', { productId })

      .andWhere(`YEAR(ir.date) = :year`, { year });

    if (period > 0) {
      query.andWhere(`MONTH(ir.date) = :period`, {
        period,
      });
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

    const categoryPromise =
      this.drillDownService.getCategory(productCategoryId);

    const groupPromise = this.drillDownService.getGroup(productGroupId);

    const [rows, entity, category, group] = await Promise.all([
      rowsPromise,
      entityPromise,
      categoryPromise,
      groupPromise,
    ]);

    return {
      rows,
      entity,
      category,
      group,
    };
  }
}
