import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SmsGroupEntity } from '@skytech/db';

export class UpdatePhoneGroupCommand {
  constructor(
    public readonly existingSmsGroup: SmsGroupEntity,
    public readonly data: {
      name: string;
      customerId: number;
      userId: number;
    },
  ) {}
}

@CommandHandler(UpdatePhoneGroupCommand)
export class UpdatePhoneGroupCommandHandler
  implements ICommandHandler<UpdatePhoneGroupCommand>
{
  constructor(
    @InjectRepository(SmsGroupEntity)
    private readonly repository: Repository<SmsGroupEntity>,
  ) {}

  async execute({ data, existingSmsGroup }: UpdatePhoneGroupCommand) {
    existingSmsGroup.name = data.name;

    const smsGroup = await this.repository.save(existingSmsGroup);

    return smsGroup;
  }
}
