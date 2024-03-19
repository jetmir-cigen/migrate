import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { IUser } from '@skytech/auth';

export class PasswordChangedEvent {
  constructor(public readonly currentUser: IUser) {}
}

@EventsHandler(PasswordChangedEvent)
export class PasswordChangedEventHandler
  implements IEventHandler<PasswordChangedEvent>
{
  constructor() {}

  private readonly logger = new Logger(PasswordChangedEventHandler.name);
  handle(event: PasswordChangedEvent): void {
    this.logger.log(`PasswordChangedEvent: ${event.currentUser.uid}`);
  }
}
