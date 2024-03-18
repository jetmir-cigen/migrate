import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { NotificationsService } from '@/modules/notifications/services';
import { UserEntity } from '../entities/user.entity';
import { ManagerNewUserCreated } from '@/modules/notifications/types';

export class UserCreatedEvent {
  constructor(
    public readonly user: UserEntity,
    public readonly currentUser: Express.User,
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
