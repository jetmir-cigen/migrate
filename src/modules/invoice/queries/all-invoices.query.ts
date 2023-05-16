import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvoiceEntity } from '../entities/invoice.entity';

type QueryFilters = {
  userId: number;
  customerId: number;
};

export class FindInvoicesByFilterQuery {
  constructor(public readonly filters: QueryFilters) {}
}

@QueryHandler(FindInvoicesByFilterQuery)
export class FindInvoicesByFilterQueryHandler
  implements IQueryHandler<FindInvoicesByFilterQuery>
{
  constructor(
    @InjectRepository(InvoiceEntity)
    private readonly invoiceRepository: Repository<InvoiceEntity>,
  ) {}

  async execute({ filters }: FindInvoicesByFilterQuery) {
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
          // .andWhere('vi.vendor_id = :customerId', { customerId })
          .getQuery();
        return 'invoice.id IN ' + subQuery;
      })
      .leftJoinAndSelect('invoice.vendor', 'vendor')
      .leftJoinAndSelect('invoice.customer', 'customer')
      .leftJoinAndSelect('invoice.elementLabel', 'elementLabel')
      .getMany();

    return invoices;
  }
}
