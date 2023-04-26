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

  async execute({ filters }: FindInvoiceByFilterQuery) {
    const { id, userId } = filters;

    try {
      const invoice = await this.invoiceRepository
        .createQueryBuilder('invoice')
        .select()
        .addFrom('view.invoice', 'vi')
        .addFrom('view.manager_access_customer', 'mac')
        .andWhere('mac.user_id = :userId', { userId })
        .andWhere('mac.customer_id = vi.customer_id')
        .andWhere('invoice.id = :id', { id })
        .andWhere('invoice.id = vi.id')
        .getOneOrFail();

      return invoice;
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundException(`Invoice with ID ${id} not found`);
      }
      throw err;
    }
  }
}
