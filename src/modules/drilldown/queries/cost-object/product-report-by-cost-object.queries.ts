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
import { CostObjectEntity } from '@/common/entities/cost-object.entity';

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
    readonly user: Express.User,
  ) {}
}

@QueryHandler(GetProductReportByCostObjectQuery)
export class GetProductReportByCostObjectQueryHandler
  implements QueryHandlerInterface<GetProductReportByCostObjectQuery>
{
  constructor(
    @InjectRepository(CostObjectEntity)
    readonly repository: Repository<CostObjectEntity>,
    @InjectRepository(InvoiceRowViewEntity)
    readonly invoiceRowRepository: Repository<InvoiceRowViewEntity>,
    readonly drillDownService: DrillDownService,
  ) {}
  async execute({
    filters,
    user,
  }: GetProductReportByCostObjectQuery): Promise<ResultType> {
    const { year, period, type, typeId, costObjectId } = filters;

    const { frameAgreementId, customerHeadId, customerId } =
      this.drillDownService.getTypes(type, typeId);

    const customersAccessList =
      await this.drillDownService.getCustomerAccessListArr(user.uid);

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
      .addSelect('ir.product_id', 'productId')
      .addSelect('ir.product_name', 'productName')
      .innerJoin(CustomerViewEntity, 'c', 'c.id = ir.customer_id')
      .where(`c.id IN (:...customersAccessList)`, { customersAccessList })
      .andWhere(`ir.vendor_id != 1`)
      .andWhere(`ir.cost_object_type != 'C'`)
      .andWhere(`ir.cost_object_id = :costObjectId`, { costObjectId })
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

    query.groupBy('ir.product_id').orderBy('SUM(ir.amount)', 'DESC');

    const rowsPromise = query.getRawMany();

    const entityPromise = this.drillDownService.getEntity(
      user.uid,
      type,
      typeId,
    );

    const costObjectPromise = this.repository.findOne({
      where: { id: costObjectId },
      select: ['id', 'name'],
    });

    const [rows, entity, costObject] = await Promise.all([
      rowsPromise,
      entityPromise,
      costObjectPromise,
    ]);

    return {
      rows,
      entity,
      costObject,
    };
  }
}
