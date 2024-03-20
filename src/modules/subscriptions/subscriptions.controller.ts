import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthUser } from '../auth/auth-user.decorator';
import { createSubscriptionOrderCommand } from './commands/create-subscription-order.command';
import { updateSubscriptionCommand } from './commands/update-subscription-order';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { getAllSubscriptionsQuery } from './queries/get-all-subscriptions.query';
import { getSubscriptionByIdQuery } from './queries/get-subscription-by-id';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getAll(@AuthUser() user: Express.User) {
    return this.queryBus.execute(getAllSubscriptionsQuery(user));
  }

  @Get(':id(\\d+)')
  async getById(@Param('id') id: number) {
    return this.queryBus.execute(getSubscriptionByIdQuery(id));
  }

  @Post()
  async create(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
    @AuthUser() user: Express.User,
  ) {
    return this.commandBus.execute(
      createSubscriptionOrderCommand(user, createSubscriptionDto),
    );
  }

  @Put(':id(\\d+)')
  async update(
    @Param('id') id: number,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    return this.commandBus.execute(
      updateSubscriptionCommand(id, updateSubscriptionDto),
    );
  }
}
