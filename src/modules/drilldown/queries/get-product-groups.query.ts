import { DrillDownServiceType } from '@/modules/drilldown/dto';
import {
  QueryHandlerInterface,
  QueryInterface,
} from '@/common/query.interface';
import { QueryHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InvoiceRowViewEntity } from '@/common/entities/invoice-row-view.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DrillDownService } from '../drilldown.service';

type QueryFilters = {
  year: number;
  period: number;
  type: DrillDownServiceType;
  typeId: number;
  productCategoryId: number;
};

export class GetProductGroupsQuery implements QueryInterface {
  $$resolveType: any;
  constructor(
    public readonly filters: QueryFilters,
    public readonly user: Express.User,
  ) {}
}

@QueryHandler(GetProductGroupsQuery)
export class GetProductGroupsQueryHandler
  implements QueryHandlerInterface<GetProductGroupsQuery>
{
  constructor(
    @InjectRepository(InvoiceRowViewEntity)
    readonly invoiceRowViewRepository: Repository<InvoiceRowViewEntity>,
    readonly drillDownService: DrillDownService,
  ) {}
  async execute({ filters, user }: GetProductGroupsQuery) {
    const { year, period, type, typeId, productCategoryId } = filters;

    const { frameAgreementId, customerHeadId, customerId } =
      this.drillDownService.getTypes(type, typeId);

    const customersAccessList =
      await this.drillDownService.getCustomerAccessList(user.uid);

    return this.invoiceRowViewRepository.query(
      `
      SELECT      SUM(ir.amount) AS amount,
                  SUM(ir.salary_deduction_amount) AS salaryDeductionAmount,
                  ir.product_group_id AS productGroupId,
                  ir.product_group_name AS productGroupName
      FROM        view.invoice_row ir
      JOIN        view.customer c ON ir.customer_id = c.id
      WHERE       c.id IN(${customersAccessList})
      AND         ir.vendor_id != 1
      ${this.drillDownService.getPeriodFilter(year, period)}
      ${this.drillDownService.getOrgFilter(
        frameAgreementId,
        customerHeadId,
        customerId,
      )}
      AND         ir.product_category_id = :productCategoryId
      GROUP BY    ir.product_group_id
      ORDER BY    SUM(ir.amount) DESC`,
      [productCategoryId],
    );
  }
}
