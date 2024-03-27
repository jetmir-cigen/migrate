import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomerAddressEntity, ManagerAccessCustomerView } from '@skytech/db';

import {
  CreateCustomerAddressCommandHandler,
  DeleteCustomerAddressCommandHandler,
  UpdateCustomerAddressCommandHandler,
} from './commands';
import { CustomerAddressController } from './customer-address.controller';
import { CustomerAddressService } from './customer-address.service';
import { GetAllCustomerAddressesQueryHandler } from './queries';

@Module({
  imports: [
    CqrsModule,
    HttpModule,
    TypeOrmModule.forFeature([
      CustomerAddressEntity,
      ManagerAccessCustomerView,
    ]),
  ],
  controllers: [CustomerAddressController],
  providers: [
    CustomerAddressService,
    GetAllCustomerAddressesQueryHandler,
    CreateCustomerAddressCommandHandler,
    DeleteCustomerAddressCommandHandler,
    UpdateCustomerAddressCommandHandler,
  ],
})
export class CustomerAddressModule {}
