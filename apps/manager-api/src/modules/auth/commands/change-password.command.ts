import { UnauthorizedException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IUser } from '@skytech/auth';
import { UserEntity } from '@skytech/db';
import { UserService } from '@skytech/manager/modules/user/user.service';

import { PasswordChangedEvent } from '../events/password-changed.event';

export class ChangePasswordCommand {
  constructor(
    public readonly data: {
      currentPassword: string;
      newPassword: string;
    },
    public readonly currentUser: IUser,
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
