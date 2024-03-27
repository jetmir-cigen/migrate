import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  ADMIN_USERS_GROUP,
  AuthGuard,
  AuthUser,
  IUser,
  UserRoles,
} from '@skytech/auth';

import {
  CreateCustomerAddressDto,
  UpdateCustomerAddressDto,
} from './dto/customer-address.dto';
import {
  createCustomerAddressCommand,
  deleteCustomerAddressCommand,
  updateCustomerAddressCommand,
} from './commands';
import { getAllCustomerAddressQuery } from './queries';

@ApiTags('addresses')
@ApiBearerAuth()
@UseGuards(AuthGuard([...ADMIN_USERS_GROUP, UserRoles.IT_USER]))
@Controller('addresses')
export class CustomerAddressController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @ApiOperation({ summary: 'create new customer address' })
  @Post()
  async create(
    @AuthUser() user: IUser,
    @Body() createCustomerAddressDto: CreateCustomerAddressDto,
  ) {
    return this.commandBus.execute(
      createCustomerAddressCommand(user, createCustomerAddressDto),
    );
  }

  @ApiOperation({ summary: 'get all customer addresses based on user id' })
  @Get()
  async findAll(@AuthUser() user: IUser) {
    return this.queryBus.execute(getAllCustomerAddressQuery(user.uid));
  }

  @ApiOperation({ summary: 'update customer address' })
  @Patch()
  async update(
    @AuthUser() user: IUser,
    @Body() updateCustomerAddressDto: UpdateCustomerAddressDto,
  ) {
    return this.commandBus.execute(
      updateCustomerAddressCommand(user, updateCustomerAddressDto),
    );
  }

  @ApiOperation({
    summary: 'delete one customer address by making it inactive',
  })
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.commandBus.execute(deleteCustomerAddressCommand(id));
  }
}
