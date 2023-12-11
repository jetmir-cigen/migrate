import { DrillDownServiceType } from '@/modules/drilldown/dto';
import {
  QueryHandlerInterface,
  QueryInterface,
} from '@/common/query.interface';
import { QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DrillDownService } from '@/modules/drilldown/drilldown.service';
import { InvoiceRowViewEntity } from '@/common/views/invoice-row-view.entity';

type List = {
  amount: number;
  salaryDeductionAmount: number;
  productId: number;
  productGroupId: number;
  productGroupName: string;
};

type QueryFilters = {
  year: number;
  period: number;
  type: DrillDownServiceType;
  typeId: number;
  productCategoryId: number;
  productGroupId: number;
};

type ResponseType = {
  rows: List[];
  entity: any;
  category: any;
  group: any;
};

export class GetProductGroupsCategoriesQuery implements QueryInterface {
  $$resolveType: ResponseType;
  constructor(
    readonly filters: QueryFilters,
    readonly user: Express.User,
  ) {}
}

@QueryHandler(GetProductGroupsCategoriesQuery)
export class GetProductGroupsCategoriesQueryHandler
  implements QueryHandlerInterface<GetProductGroupsCategoriesQuery>
{
  constructor(
    @InjectRepository(InvoiceRowViewEntity)
    readonly invoiceRowViewRepository: Repository<InvoiceRowViewEntity>,
    readonly drillDownService: DrillDownService,
  ) {}
  async execute({
    filters,
    user,
  }: GetProductGroupsCategoriesQuery): Promise<ResponseType> {
    const { year, period, type, typeId, productCategoryId, productGroupId } =
      filters;

    const { frameAgreementId, customerHeadId, customerId } =
      this.drillDownService.getTypes(type, typeId);

    const customersAccessList =
      await this.drillDownService.getCustomerAccessList(user.uid);

    const rowsPromise = this.invoiceRowViewRepository.query(
      ` SELECT * FROM (
        SELECT      SUM(ir.amount) AS amount,
                    SUM(ir.salary_deduction_amount) AS salaryDeductionAmount,
                    ir.product_id as productId,
                    ir.product_name as productName,
                    ir.product_group_id as productGroupId
        FROM        view.invoice_row ir
        JOIN        view.customer c ON ir.customer_id = c.id
        WHERE       c.id IN(${customersAccessList})
        AND         ir.vendor_id != 1
        AND         ir.cost_object_type != 'C'
        ${this.drillDownService.getPeriodFilter(year, period)}
        ${this.drillDownService.getOrgFilter(
          frameAgreementId,
          customerHeadId,
          customerId,
        )}
        AND         ir.product_category_id = ?
        GROUP BY    ir.product_id
        ORDER BY    SUM(ir.amount) DESC
    ) AS wrapper
    WHERE productGroupId = ?`,
      [productCategoryId, productGroupId],
    );

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
