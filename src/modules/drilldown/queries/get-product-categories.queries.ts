import { QueryHandler } from '@nestjs/cqrs';
import {
  QueryHandlerInterface,
  QueryInterface,
} from '@/common/query.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerViewEntity } from '@/common/entities/customer-view.entity';
import { Repository } from 'typeorm';
import { ManagerAccessFrameAgreementViewEntity } from '@/common/entities/manager-access-frame-agreement-view.entity';
import { filterCondition, getOrgFilter } from '../helpers/query';
import { DrillDownServiceType } from '../dto/product-categories-param.dto';

type QueryFilters = {
  year: number;
  period: number;
  type: DrillDownServiceType;
  typeId: number;
};

export class GetProductCategoriesQuery implements QueryInterface {
  $$resolveType: any;
  constructor(readonly filters: QueryFilters, readonly user: Express.User) {}
}

@QueryHandler(GetProductCategoriesQuery)
export class GetProductCategoriesQueryHandler
  implements QueryHandlerInterface<GetProductCategoriesQuery>
{
  constructor(
    @InjectRepository(GetProductCategoriesQuery)
    readonly viewCustomerRepository: Repository<CustomerViewEntity>,
    @InjectRepository(ManagerAccessFrameAgreementViewEntity)
    readonly mafRepository: Repository<ManagerAccessFrameAgreementViewEntity>,
  ) {}
  async execute({ filters, user }: GetProductCategoriesQuery) {
    const { year, period, type, typeId } = filters;

    const frameAgreementId =
      type === DrillDownServiceType.FRAME_AGREEMENT ? typeId : null;
    const customerHeadId =
      type === DrillDownServiceType.CUSTOMER_HEAD ? typeId : null;
    const customerId = type === DrillDownServiceType.CUSTOMER ? typeId : null;

    const getCustomerAccessList = async (userId: number) => {
      const maf = await this.mafRepository.find({
        where: { userId: userId },
        select: ['customerId'],
      });
      return maf.map((item) => item.customerId).join(',');
    };

    const customersAccessList = await getCustomerAccessList(user.uid);

    return this.viewCustomerRepository.query(`
            SELECT      SUM(ir.amount) AS amount,
                        SUM(ir.salary_deduction_amount) AS salary_deduction_amount,
                        ir.product_category_id,
                        ir.product_category_name
            FROM        view.invoice_row ir
            JOIN        view.customer c ON ir.customer_id = c.id
            WHERE       c.id IN(${customersAccessList})
            AND         ir.vendor_id != 1
            AND         ir.cost_object_type != 'C'
            ${filterCondition(year, period)}
            ${getOrgFilter(frameAgreementId, customerHeadId, customerId)}
            GROUP BY    ir.product_category_id
            ORDER BY    SUM(ir.amount) DESC`);
  }
}
