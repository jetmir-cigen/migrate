import { ManagerAccessCustomerView } from '@skytech/manager/common/views';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CustomerAddressDto } from '../dto/customer-address.dto';
import { CustomerAddressEntity } from '../entities/customer-address.entity';

class GetAllCustomerAddressesQuery {
  constructor(public readonly userId: number) {}
}
export const getAllCustomerAddressQuery = (userId: number) =>
  new GetAllCustomerAddressesQuery(userId);

@QueryHandler(GetAllCustomerAddressesQuery)
export class GetAllCustomerAddressesQueryHandler
  implements IQueryHandler<GetAllCustomerAddressesQuery>
{
  constructor(
    @InjectRepository(CustomerAddressEntity)
    private readonly customerAddressRepository: Repository<CustomerAddressEntity>,
    @InjectRepository(ManagerAccessCustomerView)
    private readonly managerAccessCustomerView: Repository<ManagerAccessCustomerView>,
  ) {}

  async getManagerAccessCustomerView(userId: number) {
    return await this.managerAccessCustomerView.find({
      where: { userId },
    });
  }

  async execute({ userId }: GetAllCustomerAddressesQuery) {
    const customerManagerAccessCustomers =
      await this.getManagerAccessCustomerView(userId);

    const customerIds = [];
    const customerHeadIds = [];
    customerManagerAccessCustomers.forEach((customer) => {
      customerIds.push(customer.customerId);
      customerHeadIds.push(customer.customerHeadId);
    });

    const customerAddresses = await this.customerAddressRepository.find({
      relations: ['country', 'customer'],
      where: [
        {
          customerHeadId: In(customerHeadIds),
          isActive: true,
        },
        {
          customerId: In(customerIds),
          isActive: true,
        },
      ],
    });
    return customerAddresses.map(
      (customerAddressEntity) =>
        new CustomerAddressDto({ customerAddressEntity }),
    );
  }
}
