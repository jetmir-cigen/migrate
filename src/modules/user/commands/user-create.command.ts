import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

import { Repository } from 'typeorm';
import { UserEntity } from '@/modules/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreatedEvent } from '@/modules/user/events/user-created.event';
import { ConflictException } from '@nestjs/common';
import { CustomerEntity } from '@/modules/customer/entities/customer.entity';

export class CreateUserCommand {
  constructor(
    public readonly data: {
      password: string;
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      username?: string;
      countryId: number;
      userGroupId: number;
      customerId: number;
    },
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
  ) {}

  async execute({ data }: CreateUserCommand): Promise<UserEntity> {
    try {
      if (data.phoneNumber) {
        data.username = data.phoneNumber;
      }
      const userCreate: Partial<UserEntity> = this.userRepository.create(data);
      const user = await this.userRepository.save(userCreate);

      this.eventBus.publish(new UserCreatedEvent(user.id));

      return user;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Username already exists');
      }
      throw error;
    }
  }
}
