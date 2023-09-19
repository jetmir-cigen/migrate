import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

import { Repository } from 'typeorm';
import { UserEntity } from '@/modules/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreatedEvent } from '@/modules/user/events/user-created.event';
import { ConflictException } from '@nestjs/common';
import { UserService } from '../user.service';

export class CreateUserCommand {
  constructor(
    public readonly data: {
      password: string;
      plainPassword: string;
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      username?: string;
      countryId: number;
      userGroupId: number;
      customerId: number;
    },
    public readonly currentUser: Express.User,
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
      const { plainPassword } = data;

      if (data.phoneNumber) {
        data.username = data.phoneNumber;
      }
      const userCreate: Partial<UserEntity> = this.userRepository.create(data);

      const user = await this.userRepository.save(userCreate);

      this.eventBus.publish(
        new UserCreatedEvent({ ...user, password: plainPassword }, currentUser),
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
