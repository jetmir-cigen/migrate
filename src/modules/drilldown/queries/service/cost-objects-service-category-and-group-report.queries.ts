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
import { ProductCategoryEntity } from '@/common/entities/product-category.entity';
import { ProductGroupEntity } from '@/common/entities/product-group.entity';
import { InvoiceEntity } from '@/modules/invoice/entities/invoice.entity';
import { VendorEntity } from '@/common/entities/vendor.entity';
import { ProductEntity } from '@/common/entities/product.entity';
import { CostObjectEntity } from '@/common/entities/cost-object.entity';
import { isDepartmentAdmin } from '@/utils/access';
import { DepartmentEntity } from '@/modules/department/entities/department.entity';

type QueryFilters = {
  year: number;
  period: number;
  type: DrillDownServiceType;
  typeId: number;
  productId: number;
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
  product: any;
};

export class CostObjectsServiceCategoryAndGroupReportQuery
  implements QueryInterface
{
  $$resolveType: ResultType;
  constructor(
    readonly filters: QueryFilters,
    readonly user: Express.User,
  ) {}
}

@QueryHandler(CostObjectsServiceCategoryAndGroupReportQuery)
export class CostObjectsServiceCategoryAndGroupReportQueryHandler
  implements
    QueryHandlerInterface<CostObjectsServiceCategoryAndGroupReportQuery>
{
  constructor(
    @InjectRepository(InvoiceRowEntity)
    readonly repository: Repository<InvoiceRowEntity>,
    @InjectRepository(ProductCategoryEntity)
    readonly categoryRepository: Repository<ProductCategoryEntity>,
    @InjectRepository(ProductGroupEntity)
    readonly groupRepository: Repository<ProductGroupEntity>,
    @InjectRepository(ProductEntity)
    readonly productRepository: Repository<ProductEntity>,
    readonly drillDownService: DrillDownService,
  ) {}
  async execute({
    filters,
    user,
  }: CostObjectsServiceCategoryAndGroupReportQuery): Promise<ResultType> {
    const {
      year,
      period,
      type,
      typeId,
      productId,
      productCategoryId,
      productGroupId,
    } = filters;

    const { frameAgreementId, customerHeadId, customerId } =
      this.drillDownService.getTypes(type, typeId);

    const query = this.repository
      .createQueryBuilder('ir')
      .select('SUM(ir.amount)', 'amount')
      .addSelect('SUM(ir.salary_deduction_amount)', 'salaryDeductionAmount')
      .addSelect('co.id', 'costObjectId')
      .addSelect('co.name', 'costObjectName')
      .addSelect(
        'SUM(CASE WHEN ir.amount = 0 THEN 0 ELSE ir.quantity END)',
        'quantity',
      )
      .addSelect(
        'SUM(CASE WHEN ir.amount = 0 THEN 0 ELSE ir.peak_volume + ir.off_peak_volume END)',
        'peakVolumeDiff',
      )
      .addSelect(`DATE_FORMAT(MIN(ir.from_period), '%Y-%m-%d')`, 'fromPeriod')
      .addSelect(`DATE_FORMAT(MAX(ir.to_period), '%Y-%m-%d')`, 'toPeriod')
      .addSelect('p.price_type', 'priceType')
      .innerJoin(
        InvoiceEntity,
        'i',
        `i.id = ir.invoice_id ${this.drillDownService.getPeriodFilter(
          year,
          period,
        )}`,
      )
      .innerJoin(
        VendorEntity,
        'v',
        'v.id = i.vendor_id AND v.is_internal_vendor != 1',
      )
      .innerJoin(
        ProductEntity,
        'p',
        'p.id = ir.product_id AND p.id = :productId',
        {
          productId,
        },
      )
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
    const isUserDepartmentAdmin = isDepartmentAdmin(user);

    if (!isUserDepartmentAdmin) {
      const customersAccessList =
        await this.drillDownService.getCustomerAccessListArr(user);
      query.where(`c.id IN (:...customersAccessList)`, { customersAccessList });
    } else {
      const departmentsAccessList =
        await this.drillDownService.getDepartmentAccessList(user.uid);

      query.innerJoin(DepartmentEntity, 'd', 'd.id = co.department_id');

      query.where(`d.id IN (:...departmentsAccessList)`, {
        departmentsAccessList,
      });
    }

    query.groupBy('co.id').orderBy('SUM(ir.amount)', 'DESC');

    const rowsPromise = query.getRawMany();

    const entityPromise = this.drillDownService.getEntity(user, type, typeId);

    const categoryPromise = this.categoryRepository.findOne({
      where: { id: productCategoryId },
      select: ['id', 'name'],
    });

    const groupPromise = this.groupRepository.findOne({
      where: { id: productGroupId },
      select: ['id', 'name'],
    });

    const productPromise = this.productRepository.findOne({
      where: { id: productId },
      select: ['id', 'name'],
    });

    const [rows, entity, category, group, product] = await Promise.allSettled([
      rowsPromise,
      entityPromise,
      categoryPromise,
      groupPromise,
      productPromise,
    ]);

    return {
      rows:
        rows.status === 'fulfilled'
          ? rows.value.map((row) => ({
              ...row,
              peakVolumeDiff: Number(row.peakVolumeDiff),
            }))
          : [],
      entity: entity.status === 'fulfilled' ? entity.value : {},
      category: category.status === 'fulfilled' ? category.value : {},
      group: group.status === 'fulfilled' ? group.value : {},
      product: product.status === 'fulfilled' ? product.value : {},
    };
  }
}
