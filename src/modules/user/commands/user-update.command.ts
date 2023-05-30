import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@/modules/user/entities/user.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UserUpdatedEvent } from '@/modules/user/events/user-updated.event';

export class UpdateUserCommand {
  constructor(
    public readonly id: number,
    public readonly data: {
      firstName?: string;
      lastName?: string;
      email?: string;
      password?: string;
      phoneNumber?: string;
      username?: string;
      countryId?: number;
      customerId?: number;
      isPasswordChangeRequired?: boolean;
    },
  ) {}
}

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler
  implements ICommandHandler<UpdateUserCommand>
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly eventBus: EventBus,
  ) {}

  async execute({ id, data }: UpdateUserCommand): Promise<void> {
    try {
      const user = await this.userRepository.findOneOrFail({ where: { id } });
      if (data.phoneNumber && user.username === user.phoneNumber) {
        data.username = data.phoneNumber;
      }

      // should not update password if user is admin
      if (user.userGroupId === 1 && data.password) {
        delete data.password;
      }

      // Password updated from user page in manager
      if (
        typeof data.isPasswordChangeRequired === 'undefined' &&
        data.password
      ) {
        data.isPasswordChangeRequired = true;
      }

      await this.userRepository.update(id, data);

      this.eventBus.publish(new UserUpdatedEvent(id));
    } catch (error) {
      throw new EntityNotFoundError(UserEntity, id);
    }
  }
}
