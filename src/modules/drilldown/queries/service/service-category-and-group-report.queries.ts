import { QueryHandler } from '@nestjs/cqrs';
import {
  QueryHandlerInterface,
  QueryInterface,
} from '@/common/query.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DrillDownServiceType } from '@/modules/drilldown/dto';
import { DrillDownService } from '../../drilldown.service';
import { InvoiceRowEntity } from '@/modules/invoice/entities/invoice-row.entity';
import { InvoiceEntity } from '@/modules/invoice/entities/invoice.entity';
import { VendorEntity } from '@/common/entities/vendor.entity';
import { ProductEntity } from '@/common/entities/product.entity';
import { ProductGroupEntity } from '@/common/entities/product-group.entity';
import { ProductCategoryEntity } from '@/common/entities/product-category.entity';
import { CostObjectEntity } from '@/common/entities/cost-object.entity';

type QueryFilters = {
  year: number;
  period: number;
  type: DrillDownServiceType;
  typeId: number;
  productCategoryId: number;
  productGroupId: number;
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
  category: any;
  group: any;
};

export class ServiceCategoryAndGroupReportQuery implements QueryInterface {
  $$resolveType: ResultType;
  constructor(
    readonly filters: QueryFilters,
    readonly user: Express.User,
  ) {}
}

@QueryHandler(ServiceCategoryAndGroupReportQuery)
export class ServiceCategoryAndGroupReportQueryHandler
  implements QueryHandlerInterface<ServiceCategoryAndGroupReportQuery>
{
  constructor(
    @InjectRepository(InvoiceRowEntity)
    readonly repository: Repository<InvoiceRowEntity>,
    @InjectRepository(ProductCategoryEntity)
    readonly categoryRepository: Repository<ProductCategoryEntity>,
    @InjectRepository(ProductGroupEntity)
    readonly groupRepository: Repository<ProductGroupEntity>,
    readonly drillDownService: DrillDownService,
  ) {}
  async execute({
    filters,
    user,
  }: ServiceCategoryAndGroupReportQuery): Promise<ResultType> {
    const { year, period, type, typeId, productCategoryId, productGroupId } =
      filters;

    const { frameAgreementId, customerHeadId, customerId } =
      this.drillDownService.getTypes(type, typeId);

    const customersAccessList =
      await this.drillDownService.getCustomerAccessListArr(user.uid);

    const query = this.repository
      .createQueryBuilder('ir')
      .select('SUM(ir.amount)', 'amount')
      .addSelect('SUM(ir.salary_deduction_amount)', 'salaryDeductionAmount')
      .addSelect('p.id', 'productId')
      .addSelect('p.name', 'productName')
      .innerJoin(
        InvoiceEntity,
        'i',
        `i.id = ir.invoice_id ${this.drillDownService.getPeriodFilter(
          year,
          period,
        )}`,
      )
      .innerJoin(VendorEntity, 'v', 'v.id = i.vendor_id AND v.id != 1')
      .innerJoin(ProductEntity, 'p', 'p.id = ir.product_id')
      .innerJoin(
        ProductGroupEntity,
        'pg',
        'pg.id = p.product_group_id AND pg.id = :productGroupId',
        {
          productGroupId,
        },
      )
      .innerJoin(
        ProductCategoryEntity,
        'pc',
        'pc.id = pg.product_category_id AND pc.id = :productCategoryId',
        {
          productCategoryId,
        },
      )
      .innerJoin(
        CostObjectEntity,
        'co',
        'co.id = ir.cost_object_id AND co.type != "C"',
      );

    this.drillDownService.getOrgFilterJoin(
      query,
      frameAgreementId,
      customerHeadId,
      customerId,
    );

    query.where('c.id IN (:...customersAccessList)', { customersAccessList });

    query.groupBy('p.id').orderBy('SUM(ir.amount)', 'DESC');

    const rowsPromise = query.getRawMany();

    const entityPromise = this.drillDownService.getEntity(
      user.uid,
      type,
      typeId,
    );

    const categoryPromise = this.categoryRepository.findOne({
      where: { id: productCategoryId },
      select: ['id', 'name'],
    });

    const groupPromise = this.groupRepository.findOne({
      where: { id: productGroupId },
      select: ['id', 'name'],
    });

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
