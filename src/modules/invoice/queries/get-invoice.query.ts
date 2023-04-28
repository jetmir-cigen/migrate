import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { InvoiceEntity } from '../entities/invoice.entity';
import { NotFoundException } from '@nestjs/common';

type QueryFilters = {
  userId: number;
  id: number;
};

export class FindInvoiceByFilterQuery {
  constructor(public readonly filters: QueryFilters) {}
}

@QueryHandler(FindInvoiceByFilterQuery)
export class FindInvoiceByFilterQueryHandler
  implements IQueryHandler<FindInvoiceByFilterQuery>
{
  constructor(
    @InjectRepository(InvoiceEntity)
    private readonly invoiceRepository: Repository<InvoiceEntity>,
  ) {}

  async execute({ filters }: FindInvoiceByFilterQuery): Promise<InvoiceEntity> {
    const { id, userId } = filters;

    try {
      const invoice = await this.invoiceRepository
        .createQueryBuilder('invoice')
        .andWhere((qb) => {
          const subQuery = qb
            .subQuery()
            .select('vi.id')
            .from('view.invoice', 'vi')
            .addFrom('view.manager_access_customer', 'mac')
            .where('mac.user_id = :userId', { userId })
            .andWhere('mac.customer_id = vi.customer_id')
            .andWhere('invoice.id = :id', { id })
            .andWhere('invoice.id = vi.id')
            .getQuery();
          return 'invoice.id IN ' + subQuery;
        })
        .getOneOrFail();

      return invoice as InvoiceEntity;
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundException(`Invoice with ID ${id} not found`);
      }
      throw err;
    }
  }
}
