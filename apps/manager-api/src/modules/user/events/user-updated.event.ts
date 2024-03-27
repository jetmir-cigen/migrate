import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

export class UserUpdatedEvent {
  constructor(public readonly userId: number) {}
}

@EventsHandler(UserUpdatedEvent)
export class UserUpdatedEventHandler
  implements IEventHandler<UserUpdatedEvent>
{
  private readonly logger = new Logger(UserUpdatedEventHandler.name);
  handle({ userId }: UserUpdatedEvent): void {
    // Handle the UserUpdatedEvent event.
    this.logger.log(`User with ID ${userId} has been created.`);
  }
}
