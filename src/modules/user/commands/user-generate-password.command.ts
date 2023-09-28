import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

import { Repository } from 'typeorm';
import { UserEntity } from '@/modules/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user.service';
import { generateRandomPassword } from '@/utils/generatePassword';
import { UserPasswordGeneratedEvent } from '../events';

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
    const password = generateRandomPassword(16);

    const hashedPassword = await this.userService.hashPassword(password);

    const user = await this.userRepository.findOneOrFail({ where: { id } });

    user.password = hashedPassword;
    user.isPasswordChangeRequired = true;

    await this.userRepository.save(user);

    this.eventBus.publish(
      new UserPasswordGeneratedEvent({ ...user, password }, currentUser),
    );
  }
}
