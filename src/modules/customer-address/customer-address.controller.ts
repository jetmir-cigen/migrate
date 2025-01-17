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
import { AuthUser } from '../auth/auth-user.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { ADMIN_USERS_GROUP } from '../user/user-role.groups';
import { UserRoleGuard } from '../user/user-role.guard';
import {
  createCustomerAddressCommand,
  deleteCustomerAddressCommand,
  updateCustomerAddressCommand,
} from './commands';
import {
  CreateCustomerAddressDto,
  UpdateCustomerAddressDto,
} from './dto/customer-address.dto';
import { getAllCustomerAddressQuery } from './queries';
import { UserRolesENUM } from '../user/user-roles.enum';

@ApiTags('addresses')
@ApiBearerAuth()
@UseGuards(
  AuthGuard,
  UserRoleGuard([...ADMIN_USERS_GROUP, UserRolesENUM.IT_USER]),
)
@Controller('addresses')
export class CustomerAddressController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @ApiOperation({ summary: 'create new customer address' })
  @Post()
  async create(
    @AuthUser() user: Express.User,
    @Body() createCustomerAddressDto: CreateCustomerAddressDto,
  ) {
    return this.commandBus.execute(
      createCustomerAddressCommand(user, createCustomerAddressDto),
    );
  }

  @ApiOperation({ summary: 'get all customer addresses based on user id' })
  @Get()
  async findAll(@AuthUser() user: Express.User) {
    return this.queryBus.execute(getAllCustomerAddressQuery(user.uid));
  }

  @ApiOperation({ summary: 'update customer address' })
  @Patch()
  async update(
    @AuthUser() user: Express.User,
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
