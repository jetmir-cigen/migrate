import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SmsGroupEntity } from '@skytech/db';

export class DeletePhoneGroupCommand {
  constructor(public readonly existingSmsGroup: SmsGroupEntity) {}
}

@CommandHandler(DeletePhoneGroupCommand)
export class DeletePhoneGroupCommandHandler
  implements ICommandHandler<DeletePhoneGroupCommand>
{
  constructor(
    @InjectRepository(SmsGroupEntity)
    private readonly repository: Repository<SmsGroupEntity>,
  ) {}

  async execute({ existingSmsGroup }: DeletePhoneGroupCommand) {
    await this.repository.delete(existingSmsGroup);

    return true;
  }
}
