import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { IUser } from '@skytech/auth';
import { UserEntity } from '@skytech/db';
import { NotificationsService } from '@skytech/manager/modules/notifications/services';
import { ManagerPasswordGenerated } from '@skytech/manager/modules/notifications/types';

export class UserPasswordGeneratedEvent {
  constructor(
    public readonly user: UserEntity,
    public readonly currentUser: IUser,
  ) {}
}

@EventsHandler(UserPasswordGeneratedEvent)
export class UserPasswordGeneratedEventHandler
  implements IEventHandler<UserPasswordGeneratedEvent>
{
  constructor(private readonly notificationService: NotificationsService) {}

  private readonly logger = new Logger(UserPasswordGeneratedEventHandler.name);
  handle(event: UserPasswordGeneratedEvent): void {
    const { user, currentUser } = event;

    const notificationParams = new ManagerPasswordGenerated({
      newPassword: user.password,
      userPhoneNumber: user.phoneNumber,
    });

    this.notificationService.sendToUser(
      user.id,
      notificationParams,
      currentUser,
    );

    // Handle the UserPasswordGeneratedEvent event.
    this.logger.log(`UserPasswordGeneratedEvent: ${user.id}`);
  }
}
