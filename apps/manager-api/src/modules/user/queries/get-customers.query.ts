import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from '@skytech/db';

export class GetCustomersQuery {
  constructor(public readonly customerHeadId: number) {}
}

@QueryHandler(GetCustomersQuery)
export class GetCustomerQueryHandler
  implements IQueryHandler<GetCustomersQuery>
{
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly repository: Repository<CustomerEntity>,
  ) {}

  async execute({
    customerHeadId,
  }: GetCustomersQuery): Promise<CustomerEntity[]> {
    return this.repository.find({
      where: {
        customerHeadId,
      },
    });
  }
}
