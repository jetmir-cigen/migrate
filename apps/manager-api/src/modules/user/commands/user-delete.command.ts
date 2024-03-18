import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { EntityNotFoundError, Repository } from 'typeorm';
import { UserEntity } from '@skytech/manager/modules/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDeletedEvent } from '@skytech/manager/modules/user/events/user-deleted.event';

export class DeleteUserCommand {
  constructor(public readonly id: number) {}
}

@CommandHandler(DeleteUserCommand)
export class DeleteUserCommandHandler
  implements ICommandHandler<DeleteUserCommand>
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly eventBus: EventBus,
  ) {}

  async execute({ id }: DeleteUserCommand): Promise<void> {
    try {
      await this.userRepository.findOneOrFail({ where: { id } });

      await this.userRepository.delete(id);

      this.eventBus.publish(new UserDeletedEvent(id));
    } catch (error) {
      throw new EntityNotFoundError(UserEntity, id);
    }
  }
}
