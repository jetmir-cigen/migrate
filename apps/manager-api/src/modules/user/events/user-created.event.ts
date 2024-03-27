import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { IUser } from '@skytech/auth';
import { UserEntity } from '@skytech/db';
import { NotificationsService } from '@skytech/manager/modules/notifications/services';
import { ManagerNewUserCreated } from '@skytech/manager/modules/notifications/types';

export class UserCreatedEvent {
  constructor(
    public readonly user: UserEntity,
    public readonly currentUser: IUser,
  ) {}
}

@EventsHandler(UserCreatedEvent)
export class UserCreatedEventHandler
  implements IEventHandler<UserCreatedEvent>
{
  constructor(private readonly notificationService: NotificationsService) {}

  private readonly logger = new Logger(UserCreatedEventHandler.name);
  handle(event: UserCreatedEvent): void {
    const { user, currentUser } = event;

    const notificationParams = new ManagerNewUserCreated({
      newPassword: user.password,
      userPhoneNumber: user.phoneNumber,
    });

    this.notificationService.sendToUser(
      user.id,
      notificationParams,
      currentUser,
    );

    // Handle the UserCreatedEvent event.
    this.logger.log(`User with ID ${event.user.id} has been created.`);
  }
}
