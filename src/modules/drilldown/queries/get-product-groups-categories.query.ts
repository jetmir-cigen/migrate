import { DrillDownServiceType } from '@/modules/drilldown/dto';
import {
  QueryHandlerInterface,
  QueryInterface,
} from '@/common/query.interface';
import { QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DrillDownService } from '@/modules/drilldown/drilldown.service';
import { InvoiceRowViewEntity } from '@/common/entities/invoice-row-view.entity';

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

export class GetProductGroupsCategoriesQuery implements QueryInterface {
  $$resolveType: List[];
  constructor(readonly filters: QueryFilters, readonly user: Express.User) {}
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
  }: GetProductGroupsCategoriesQuery): Promise<List[]> {
    const { year, period, type, typeId, productCategoryId, productGroupId } =
      filters;

    const { frameAgreementId, customerHeadId, customerId } =
      this.drillDownService.getTypes(type, typeId);

    const customersAccessList =
      await this.drillDownService.getCustomerAccessList(user.uid);
    return this.invoiceRowViewRepository.query(
      `
      SELECT * FROM (
          SELECT      SUM(ir.amount) AS amount,
                      SUM(ir.salary_deduction_amount) AS salary_deduction_amount,
                      ir.product_id,
                      ir.product_name,
                      ir.product_group_id
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
          AND         ir.product_category_id = :productCategoryId
          GROUP BY    ir.product_id
          ORDER BY    SUM(ir.amount) DESC
      ) AS wrapper
      WHERE product_group_id = :productGroupId`,
      [productCategoryId, productGroupId],
    );
  }
}
