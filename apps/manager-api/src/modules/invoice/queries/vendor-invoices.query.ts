import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceEntity } from '@skytech/db';
import { Repository } from 'typeorm';

type QueryFilters = {
  userId: number;
  customerId: number;
};

export class FindVendorInvoicesByFilterQuery {
  constructor(public readonly filters: QueryFilters) {}
}

@QueryHandler(FindVendorInvoicesByFilterQuery)
export class FindVendorInvoicesByFilterQueryHandler
  implements IQueryHandler<FindVendorInvoicesByFilterQuery>
{
  constructor(
    @InjectRepository(InvoiceEntity)
    private readonly invoiceRepository: Repository<InvoiceEntity>,
  ) {}

  async execute({ filters }: FindVendorInvoicesByFilterQuery) {
    const { customerId, userId } = filters;

    const invoices = await this.invoiceRepository
      .createQueryBuilder('invoice')
      .andWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select('vi.id')
          .from('view.invoice', 'vi')
          .addFrom('view.manager_access_customer', 'mac')
          .where('mac.user_id = :userId', { userId })
          .andWhere('mac.customer_id = vi.customer_id')
          .andWhere('invoice.id = vi.id')
          .andWhere('vi.vendor_id != :customerId', { customerId })
          .getQuery();
        return 'invoice.id IN ' + subQuery;
      })
      .getMany();

    return invoices;
  }
}
