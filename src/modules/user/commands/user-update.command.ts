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
      // userGroupId?: number;
      countryId?: number;
      customerId?: number;
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
      await this.userRepository.findOneOrFail({ where: { id } });

      await this.userRepository.update(id, data);

      this.eventBus.publish(new UserUpdatedEvent(id));
    } catch (error) {
      throw new EntityNotFoundError(UserEntity, id);
    }
  }
}
