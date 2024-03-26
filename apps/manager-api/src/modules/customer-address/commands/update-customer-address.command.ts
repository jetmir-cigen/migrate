import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CustomerAddressDto,
  UpdateCustomerAddressDto,
} from '../dto/customer-address.dto';
import { IUser } from '@skytech/auth';
import { CustomerAddressEntity } from '@skytech/db';

class UpdateCustomerAddressCommand {
  constructor(
    public readonly user: IUser,
    public readonly customerAddressDto: UpdateCustomerAddressDto,
  ) {}
}
export const updateCustomerAddressCommand = (
  user: IUser,
  customerAddressDto: UpdateCustomerAddressDto,
) => new UpdateCustomerAddressCommand(user, customerAddressDto);

@CommandHandler(UpdateCustomerAddressCommand)
export class UpdateCustomerAddressCommandHandler
  implements ICommandHandler<UpdateCustomerAddressCommand>
{
  constructor(
    @InjectRepository(CustomerAddressEntity)
    private readonly customerAddressRepository: Repository<CustomerAddressEntity>,
  ) {}

  async execute({ user, customerAddressDto }: UpdateCustomerAddressCommand) {
    const entity = await customerAddressDto.getCustomerAddressEntity({
      user,
    });

    await this.customerAddressRepository.update(
      {
        id: entity.id,
      },
      entity,
    );

    const ret = await this.customerAddressRepository.findOne({
      where: { id: entity.id },
      relations: ['country', 'customer'],
    });

    return new CustomerAddressDto({ customerAddressEntity: ret });
  }
}
