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
import { isDepartmentAdmin } from '@/utils/access';
import { DepartmentEntity } from '@/modules/department/entities/department.entity';

type QueryFilters = {
  year: number;
  period: number;
  type: DrillDownServiceType;
  typeId: number;
  productCategoryId: number;
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
};

export class ServiceProductCategoryReportQuery implements QueryInterface {
  $$resolveType: ResultType;
  constructor(readonly filters: QueryFilters, readonly user: Express.User) {}
}

@QueryHandler(ServiceProductCategoryReportQuery)
export class ServiceProductCategoryReportQueryHandler
  implements QueryHandlerInterface<ServiceProductCategoryReportQuery>
{
  constructor(
    @InjectRepository(InvoiceRowEntity)
    readonly repository: Repository<InvoiceRowEntity>,
    @InjectRepository(ProductCategoryEntity)
    readonly categoryRepository: Repository<ProductCategoryEntity>,
    readonly drillDownService: DrillDownService,
  ) {}
  async execute({
    filters,
    user,
  }: ServiceProductCategoryReportQuery): Promise<ResultType> {
    const { year, period, type, typeId, productCategoryId } = filters;

    console.log('ServiceProductCategoryReportQueryHandler');

    const { frameAgreementId, customerHeadId, customerId } =
      this.drillDownService.getTypes(type, typeId);

    const query = this.repository
      .createQueryBuilder('ir')
      .select('SUM(ir.amount)', 'amount')
      .addSelect('SUM(ir.salary_deduction_amount)', 'salaryDeductionAmount')
      .addSelect('pg.id', 'productGroupId')
      .addSelect('pg.name', 'productGroupName')
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
      .innerJoin(ProductEntity, 'p', 'p.id = ir.product_id')
      .innerJoin(ProductGroupEntity, 'pg', 'pg.id = p.product_group_id')
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

    query.groupBy('pg.id').orderBy('SUM(ir.amount)', 'DESC');

    const rowsPromise = query.getRawMany();

    const entityPromise = this.drillDownService.getEntity(user, type, typeId);

    const categoryPromise = this.categoryRepository.findOne({
      where: { id: productCategoryId },
      select: ['id', 'name'],
    });

    const [rows, entity, category] = await Promise.allSettled([
      rowsPromise,
      entityPromise,
      categoryPromise,
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
    };
  }
}
