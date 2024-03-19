import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CreateCustomerAddressDto,
  CustomerAddressDto,
} from '../dto/customer-address.dto';
import { CustomerAddressEntity } from '../entities/customer-address.entity';
import { IUser } from '@skytech/auth';

class CreateCustomerAddressCommand {
  constructor(
    public readonly user: IUser,
    public readonly customerAddressDto: CreateCustomerAddressDto,
  ) {}
}
export const createCustomerAddressCommand = (
  user: IUser,
  customerAddressDto: CreateCustomerAddressDto,
) => new CreateCustomerAddressCommand(user, customerAddressDto);

@CommandHandler(CreateCustomerAddressCommand)
export class CreateCustomerAddressCommandHandler
  implements ICommandHandler<CreateCustomerAddressCommand>
{
  constructor(
    @InjectRepository(CustomerAddressEntity)
    private readonly customerAddressRepository: Repository<CustomerAddressEntity>,
  ) {}

  async execute({ user, customerAddressDto }: CreateCustomerAddressCommand) {
    const entity = await customerAddressDto.getCustomerAddressEntity({
      user,
    });

    const ret = await this.customerAddressRepository.save(entity);

    const result = await this.customerAddressRepository.findOne({
      where: { id: ret.id },
      relations: ['country', 'customer'],
    });

    return new CustomerAddressDto({ customerAddressEntity: result });
  }
}
