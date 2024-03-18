import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CustomerAddressDto,
  UpdateCustomerAddressDto,
} from '../dto/customer-address.dto';
import { CustomerAddressEntity } from '../entities/customer-address.entity';

class UpdateCustomerAddressCommand {
  constructor(
    public readonly user: Express.User,
    public readonly customerAddressDto: UpdateCustomerAddressDto,
  ) {}
}
export const updateCustomerAddressCommand = (
  user: Express.User,
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
    try {
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
    } catch (error) {
      throw error;
    }
  }
}
