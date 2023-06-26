import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

export class UserCreatedEvent {
  constructor(public readonly id: number) {}
}

@EventsHandler(UserCreatedEvent)
export class UserCreatedEventHandler
  implements IEventHandler<UserCreatedEvent>
{
  private readonly logger = new Logger(UserCreatedEventHandler.name);
  handle(event: UserCreatedEvent): void {
    // Handle the UserCreatedEvent event.
    this.logger.log(`User with ID ${event.id} has been created.`);
  }
}
