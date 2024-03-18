import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
