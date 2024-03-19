import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { createSubscriptionOrderCommand } from './commands/create-service-order.command';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { AuthUser, IUser } from '@skytech/auth';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  create(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
    @AuthUser() user: IUser,
  ) {
    return this.commandBus.execute(
      createSubscriptionOrderCommand(user, createSubscriptionDto),
    );
  }
}
