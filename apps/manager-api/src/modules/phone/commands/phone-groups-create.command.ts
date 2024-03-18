import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SmsGroupEntity } from '../entities/sms-group.entity';

export class CreatePhoneGroupCommand {
  constructor(
    public readonly data: {
      name: string;
      customerId: number;
      userId: number;
    },
  ) {}
}

@CommandHandler(CreatePhoneGroupCommand)
export class CreatePhoneGroupCommandHandler
  implements ICommandHandler<CreatePhoneGroupCommand>
{
  constructor(
    @InjectRepository(SmsGroupEntity)
    private readonly repository: Repository<SmsGroupEntity>,
  ) {}

  async execute({ data }: CreatePhoneGroupCommand) {
    const smsGroup = this.repository.create(data);

    await this.repository.insert(smsGroup);

    return smsGroup;
  }
}
