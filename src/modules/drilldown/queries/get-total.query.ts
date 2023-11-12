import {
  QueryHandlerInterface,
  QueryInterface,
} from '@/common/query.interface';
import { QueryHandler } from '@nestjs/cqrs';
import { CustomerViewEntity } from '@/common/entities/customer-view.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DrillDownService } from '@/modules/drilldown/drilldown.service';

type QueryFilters = {
  year: number;
  period: number;
  user: Express.User;
};

type List = {
  amount: number;
  salaryDeductionAmount: number;
  customerId: number;
  customerName: string;
  customerOrgNo: string;
  customerHeadId: number;
  customerHeadName: string;
  customerHeadFrameAgreementId: number;
  customerHeadFrameAgreementName: string;
};

export class GetTotalQuery implements QueryInterface {
  $$resolveType: List[];

  constructor(public readonly filters: QueryFilters) {}
}

@QueryHandler(GetTotalQuery)
export class GetTotalQueryHandler
  implements QueryHandlerInterface<GetTotalQuery>
{
  constructor(
    @InjectRepository(CustomerViewEntity)
    readonly viewCustomerRepository: Repository<CustomerViewEntity>,
    readonly drillDownService: DrillDownService,
  ) {}
  async execute({ filters }: GetTotalQuery) {
    const { year, period, user } = filters;
    const customersAccessList =
      await this.drillDownService.getCustomerAccessList(user.uid);
    return this.viewCustomerRepository.query(
      `
      SELECT SUM(ir.amount) AS amount,
                        SUM(ir.salary_deduction_amount) AS salaryDeductionAmount,
                        c.id AS customerId,
                        c.name AS customerName,
                        c.org_no AS customerOrgNo,
                        c.customer_head_id AS customerHeadId,
                        c.customer_head_name AS customerHeadName,
                        c.customer_head_frame_agreement_id AS customerHeadFrameAgreementId,
                        c.customer_head_frame_agreement_name AS customerHeadFrameAgreementName
            FROM        view.customer c
            LEFT JOIN   view.invoice_row ir ON ir.customer_id = c.id ${this.drillDownService.getPeriodFilter(
              year,
              period,
            )}
            AND         ir.vendor_id != 1
            AND         ir.cost_object_type != 'C'
            WHERE       c.id IN(${customersAccessList})
            GROUP BY    c.id
            ORDER BY    SUM(ir.amount) DESC
    `,
    );
  }
}
