import {
  QueryHandlerInterface,
  QueryInterface,
} from '@/common/query.interface';
import { QueryHandler } from '@nestjs/cqrs';
import { CustomerViewEntity } from '@/common/entities/customer-view.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

type QueryFilters = {
  year: number;
  period: number;
};

export class GetTotalQuery implements QueryInterface {
  $$resolveType: any;

  constructor(public readonly filters: QueryFilters) {}
}

@QueryHandler(GetTotalQuery)
export class GetTotalQueryHandler
  implements QueryHandlerInterface<GetTotalQuery>
{
  constructor(
    @InjectRepository(CustomerViewEntity)
    readonly viewCustomerRepository: Repository<CustomerViewEntity>,
  ) {}
  async execute({ filters }: GetTotalQuery) {
    const { year, period } = filters;
    const filterCondition =
      period <= 0
        ? `AND YEAR(ir.date) = ${year}`
        : `AND (YEAR(ir.date) = ${year} AND MONTH(ir.date) = ${period})`;
    const result = await this.viewCustomerRepository.query(`
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
            LEFT JOIN   view.invoice_row ir ON ir.customer_id = c.id ${filterCondition}
            AND         ir.vendor_id != 1
            AND         ir.cost_object_type != 'C'
            GROUP BY    c.id
            ORDER BY    SUM(ir.amount) DESC
    `);

    return result;
  }
}
