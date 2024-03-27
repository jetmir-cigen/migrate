import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

export class UserDeletedEvent {
  constructor(public readonly userId: number) {}
}

@EventsHandler(UserDeletedEvent)
export class UserDeletedEventHandler
  implements IEventHandler<UserDeletedEvent>
{
  private readonly logger = new Logger(UserDeletedEventHandler.name);
  handle({ userId }: UserDeletedEvent): void {
    // Handle the UserDeletedEvent event.
    this.logger.log(`User with ID ${userId} has been created.`);
  }
}
