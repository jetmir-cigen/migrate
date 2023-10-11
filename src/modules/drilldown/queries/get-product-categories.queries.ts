import { QueryHandler } from '@nestjs/cqrs';
import {
  QueryHandlerInterface,
  QueryInterface,
} from '@/common/query.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerViewEntity } from '@/common/entities/customer-view.entity';
import { Repository } from 'typeorm';
import { DrillDownServiceType } from '../dto/product-categories-param.dto';
import { DrillDownService } from '../drilldown.service';

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

export class GetProductCategoriesQuery implements QueryInterface {
  $$resolveType: List[];
  constructor(readonly filters: QueryFilters, readonly user: Express.User) {}
}

@QueryHandler(GetProductCategoriesQuery)
export class GetProductCategoriesQueryHandler
  implements QueryHandlerInterface<GetProductCategoriesQuery>
{
  constructor(
    @InjectRepository(CustomerViewEntity)
    readonly customerViewRepository: Repository<CustomerViewEntity>,
    readonly drillDownService: DrillDownService,
  ) {}
  async execute({ filters, user }: GetProductCategoriesQuery): Promise<List[]> {
    const { year, period, type, typeId } = filters;

    const { frameAgreementId, customerHeadId, customerId } =
      this.drillDownService.getTypes(type, typeId);

    const customersAccessList =
      await this.drillDownService.getCustomerAccessList(user.uid);

    return this.customerViewRepository.query(`
            SELECT      SUM(ir.amount) AS amount,
                        SUM(ir.salary_deduction_amount) AS salaryDeductionAmount,
                        ir.product_category_id as productCategoryId,
                        ir.product_category_name as productCategoryName
            FROM        view.invoice_row ir
            JOIN        view.customer c ON ir.customer_id = c.id
            WHERE       c.id IN(${customersAccessList}})
            AND         ir.vendor_id != 1
            AND         ir.cost_object_type != 'C'
            ${this.drillDownService.getPeriodFilter(year, period)}
            ${this.drillDownService.getOrgFilter(
              frameAgreementId,
              customerHeadId,
              customerId,
            )}
            GROUP BY    ir.product_category_id
            ORDER BY    SUM(ir.amount) DESC`);
  }
}
