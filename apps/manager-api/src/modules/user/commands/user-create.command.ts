import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreatedEvent } from '@skytech/manager/modules/user/events/user-created.event';
import { ConflictException } from '@nestjs/common';
import { UserService } from '../user.service';
import { generateRandomPassword } from '@skytech/manager/utils/generatePassword';
import { IUser } from '@skytech/auth';
import { UserEntity } from '@skytech/db';

export class CreateUserCommand {
  constructor(
    public readonly data: {
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      username?: string;
      countryId: number;
      userGroupId: number;
      customerId: number;
    },
    public readonly currentUser: IUser,
  ) {}
}

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly eventBus: EventBus,
    private readonly userService: UserService,
  ) {}

  async execute({ data, currentUser }: CreateUserCommand): Promise<UserEntity> {
    try {
      if (data.phoneNumber) {
        data.username = data.phoneNumber;
      }

      const password = generateRandomPassword(16);
      const hashedPassword = await this.userService.hashPassword(password);

      const userCreate: Partial<UserEntity> = this.userRepository.create({
        ...data,
        password: hashedPassword,
      });

      const user = await this.userRepository.save(userCreate);

      this.eventBus.publish(
        new UserCreatedEvent({ ...user, password }, currentUser),
      );

      return user;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Username already exists');
      }
      throw error;
    }
  }
}
