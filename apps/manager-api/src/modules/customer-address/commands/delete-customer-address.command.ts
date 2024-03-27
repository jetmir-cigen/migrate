import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CustomerAddressEntity } from '@skytech/db';

class DeleteCustomerAddressCommand {
  constructor(public readonly id: number) {}
}
export const deleteCustomerAddressCommand = (id: number) =>
  new DeleteCustomerAddressCommand(id);

@CommandHandler(DeleteCustomerAddressCommand)
export class DeleteCustomerAddressCommandHandler
  implements ICommandHandler<DeleteCustomerAddressCommand>
{
  constructor(
    @InjectRepository(CustomerAddressEntity)
    private readonly customerAddressRepository: Repository<CustomerAddressEntity>,
  ) {}

  async execute({ id }: DeleteCustomerAddressCommand) {
    const entity = await this.customerAddressRepository.update(
      {
        id: id,
      },
      {
        isActive: false,
      },
    );

    return entity;
  }
}
