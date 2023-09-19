import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

import { Repository } from 'typeorm';
import { UserEntity } from '@/modules/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user.service';
import { UserCreatedEvent } from '../events';

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

    user.password = hashedPassword;

    await this.userRepository.save(user);

    this.eventBus.publish(
      new UserCreatedEvent({ ...user, password }, currentUser),
    );
  }
}

// This function will be added to main by another branch and then replaced and removed
export const generateRandomPassword = (length = 8): string => {
  const characters = {
    // object of letters, numbers & symbols
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '^!$%&|[](){}:;.,*+-#@<>~',
  };
  const staticPassword = Object.values(characters).join(''); // joining all characters
  let randomPassword = '';
  const excludeDuplicate = false;

  for (let i = 0; i < length; i++) {
    // getting random character from the static password
    const randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (excludeDuplicate) {
      /**
       * if randomPassword doesn't contain the current random character or randomChar is equal
       * to space " " then add random character to randomPassword else decrement i by -1
       */
      !randomPassword.includes(randomChar) || randomChar === ' '
        ? (randomPassword += randomChar)
        : i--;
    } else {
      randomPassword += randomChar;
    }
  }
  return randomPassword;
};
