import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

import { Repository } from 'typeorm';
import { UserEntity } from '@/modules/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '@/modules/user/user.service';
import { PasswordChangedEvent } from '../events/password-changed.event';
import { UnauthorizedException } from '@nestjs/common';

export class ChangePasswordCommand {
  constructor(
    public readonly data: {
      currentPassword: string;
      newPassword: string;
    },
    public readonly currentUser: Express.User,
  ) {}
}

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordCommandHandler
  implements ICommandHandler<ChangePasswordCommand>
{
  constructor(
    private readonly userService: UserService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly eventBus: EventBus,
  ) {}

  async execute({ currentUser, data }: ChangePasswordCommand) {
    const { currentPassword, newPassword } = data;

    const user = await this.userRepository.findOneOrFail({
      where: { id: currentUser.uid },
    });

    const isPasswordValid = await this.userService.validatePassword(
      currentPassword,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const hashedPassword = await this.userService.hashPassword(newPassword);

    user.password = hashedPassword;

    await this.userRepository.save(user);

    this.eventBus.publish(new PasswordChangedEvent(currentUser));
  }
}
