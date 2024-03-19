import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@skytech/manager/modules/user/entities/user.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UserUpdatedEvent } from '@skytech/manager/modules/user/events/user-updated.event';
import { ForbiddenException } from '@nestjs/common';
import { IUser } from '@skytech/auth';

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
    public readonly currentUser: IUser,
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

  async execute({ id, data, currentUser }: UpdateUserCommand): Promise<void> {
    try {
      const user = await this.userRepository.findOneOrFail({ where: { id } });
      const authUser = await this.userRepository.findOneOrFail({
        where: { id: currentUser.uid },
      });

      // If the current user is not the same as the user being updated,
      // then we need to check if the current user has a higher userGroupId than the user being updated
      if (authUser.id !== user.id && authUser.userGroupId > user.userGroupId) {
        throw new ForbiddenException('You are not allowed to update this user');
      }

      if (data.phoneNumber && user.username === user.phoneNumber) {
        data.username = data.phoneNumber;
      }

      await this.userRepository.update(id, data);

      this.eventBus.publish(new UserUpdatedEvent(id));
    } catch (error) {
      if (error instanceof ForbiddenException) throw error;

      throw new EntityNotFoundError(UserEntity, id);
    }
  }
}
