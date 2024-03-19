import {
  QueryHandlerInterface,
  QueryInterface,
} from '@skytech/manager/common/query.interface';
import { QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DrillDownService } from '@skytech/manager/modules/drilldown/drilldown.service';
import { InvoiceRowEntity } from '@skytech/manager/modules/invoice/entities/invoice-row.entity';
import { InvoiceEntity } from '@skytech/manager/modules/invoice/entities/invoice.entity';
import { VendorEntity } from '@skytech/manager/common/entities/vendor.entity';
import { CostObjectEntity } from '@skytech/manager/common/entities/cost-object.entity';
import { CustomerEntity } from '@skytech/manager/modules/customer/entities/customer.entity';
import { CustomerHeadEntity } from '@skytech/manager/common/entities/customer-head.entity';
import { CustomerHeadFrameAgreementEntity } from '@skytech/manager/common/entities/customer-head-frame-agreement.entity';
import { IUser } from '@skytech/auth';

type QueryFilters = {
  year: number;
  period: number;
  user: IUser;
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
    @InjectRepository(CustomerEntity)
    readonly repository: Repository<CustomerEntity>,
    readonly drillDownService: DrillDownService,
  ) {}
  async execute({ filters }: GetTotalQuery) {
    const { year, period, user } = filters;
    const customersAccessList =
      await this.drillDownService.getCustomerAccessListArr(user);

    const query = this.repository
      .createQueryBuilder('c')
      .select(
        'SUM(CASE WHEN co.id IS NOT NULL THEN ir.amount ELSE 0 END)',
        'amount',
      )
      .addSelect(
        'SUM(CASE WHEN co.id IS NOT NULL THEN ir.salary_deduction_amount ELSE 0 END)',
        'salaryDeductionAmount',
      )
      .addSelect('c.id', 'customerId')
      .addSelect('c.name', 'customerName')
      .addSelect('c.org_no', 'customerOrgNo')
      .addSelect('ch.id', 'customerHeadId')
      .addSelect('ch.name', 'customerHeadName')
      .addSelect('chfa.id', 'customerHeadFrameAgreementId')
      .addSelect('chfa.name', 'customerHeadFrameAgreementName')
      .innerJoin(CustomerHeadEntity, 'ch', 'c.customer_head_id = ch.id')
      .leftJoin(
        CustomerHeadFrameAgreementEntity,
        'chfa',
        'ch.customer_head_frame_agreement_id = chfa.id',
      )
      .leftJoin(
        InvoiceEntity,
        'i',
        `i.customer_id = c.id ${this.drillDownService.getPeriodFilter(
          year,
          period,
        )}`,
      )
      .leftJoin(InvoiceRowEntity, 'ir', `ir.invoice_id = i.id`)
      .leftJoin(
        VendorEntity,
        'v',
        'v.id = i.vendor_id AND v.is_internal_vendor != 1',
      )
      .leftJoin(
        CostObjectEntity,
        'co',
        `co.id = ir.cost_object_id AND co.type != 'C'`,
      )
      .where(`c.id IN (:...customersAccessList)`, { customersAccessList });

    query.groupBy('c.id').orderBy('SUM(ir.amount)', 'DESC');

    const result = await query.getRawMany();

    console.log(result.reduce((acc, item) => acc + Number(item.amount), 0));

    return result;
  }
}
