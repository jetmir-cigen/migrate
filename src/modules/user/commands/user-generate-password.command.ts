import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

import { Repository } from 'typeorm';
import { UserEntity } from '@/modules/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user.service';
import { generateRandomPassword } from '@/utils/generatePassword';
import { UserPasswordGeneratedEvent } from '../events';
import { ForbiddenException } from '@nestjs/common';

export class GenerateUserPasswordCommand {
  constructor(
    public readonly id: number,
    public readonly currentUser: Express.User,
  ) {}
}

@CommandHandler(GenerateUserPasswordCommand)
export class GenerateUserPasswordCommandHandler
  implements ICommandHandler<GenerateUserPasswordCommand>
{
  constructor(
    private readonly userService: UserService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly eventBus: EventBus,
  ) {}

  async execute({ id, currentUser }: GenerateUserPasswordCommand) {
    const password = generateRandomPassword();

    const hashedPassword = await this.userService.hashPassword(password);

    const user = await this.userRepository.findOneOrFail({ where: { id } });
    const authUser = await this.userRepository.findOneOrFail({
      where: { id: currentUser.uid },
    });

    // If the current user is not the same as the user being updated,
    // then we need to check if the current user has a higher userGroupId than the user being updated
    if (authUser.id !== user.id && authUser.userGroupId >= user.userGroupId) {
      throw new ForbiddenException('You are not allowed to update this user');
    }

    await this.userRepository.update(id, {
      password: hashedPassword,
      isPasswordChangeRequired: true,
    });

    this.eventBus.publish(
      new UserPasswordGeneratedEvent({ ...user, password }, currentUser),
    );
  }
}
