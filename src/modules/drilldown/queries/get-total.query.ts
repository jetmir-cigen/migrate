import {
  QueryHandlerInterface,
  QueryInterface,
} from '@/common/query.interface';
import { QueryHandler } from '@nestjs/cqrs';
import { CustomerViewEntity } from '@/common/entities/customer-view.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DrillDownService } from '@/modules/drilldown/drilldown.service';
import { InvoiceRowViewEntity } from '@/common/views/invoice-row-view.entity';

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
      await this.drillDownService.getCustomerAccessListArr(user.uid);

    const query = this.viewCustomerRepository.createQueryBuilder('c');

    if (period > 0) {
      query.leftJoinAndSelect(
        InvoiceRowViewEntity,
        'ir',
        `ir.customer_id = c.id AND YEAR(ir.date) = :year AND MONTH(ir.date) = :period AND ir.vendor_id != 1 AND ir.cost_object_type != 'C'`,
        { year, period },
      );
    } else {
      query.leftJoinAndSelect(
        InvoiceRowViewEntity,
        'ir',
        `ir.customer_id = c.id AND YEAR(ir.date) = :year AND ir.vendor_id != 1 AND ir.cost_object_type != 'C'`,
        { year },
      );
    }

    query
      .select('SUM(ir.amount)', 'amount')
      .addSelect('SUM(ir.salary_deduction_amount)', 'salaryDeductionAmount')
      .addSelect('c.id', 'customerId')
      .addSelect('c.name', 'customerName')
      .addSelect('c.org_no', 'customerOrgNo')
      .addSelect('c.customer_head_id', 'customerHeadId')
      .addSelect('c.customer_head_name', 'customerHeadName')
      .addSelect(
        'c.customer_head_frame_agreement_id',
        'customerHeadFrameAgreementId',
      )
      .addSelect(
        'c.customer_head_frame_agreement_name',
        'customerHeadFrameAgreementName',
      )
      .where(`c.id IN (:...customersAccessList)`, { customersAccessList })
      .groupBy('c.id')
      .orderBy('SUM(ir.amount)', 'DESC');

    return query.getRawMany();
  }
}
