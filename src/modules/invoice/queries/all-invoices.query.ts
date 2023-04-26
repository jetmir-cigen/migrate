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

  async execute({
    filters,
  }: FindInvoicesByFilterQuery): Promise<InvoiceEntity[]> {
    const { customerId, userId } = filters;

    const invoices = await this.invoiceRepository
      .createQueryBuilder('invoice')
      .select()
      .addFrom('view.invoice', 'vi')
      .addFrom('view.manager_access_customer', 'mac')
      .andWhere('mac.user_id = :userId', { userId })
      .andWhere('mac.customer_id = vi.customer_id')
      .andWhere('invoice.id = vi.id')
      .andWhere('vi.vendor_id = :customerId', { customerId })
      .getMany();

    return invoices as InvoiceEntity[];
  }
}
