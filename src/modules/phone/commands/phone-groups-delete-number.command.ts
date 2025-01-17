import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SmsGroupEntity } from '../entities/sms-group.entity';
import { SmsGroupNumberEntity } from '../entities/sms-group-number.entity';

export class DeleteNumberFromPhoneGroupCommand {
  constructor(
    public readonly user: Express.User,
    public readonly groupId: number,
    public readonly groupNumberId: number,
  ) {}
}

@CommandHandler(DeleteNumberFromPhoneGroupCommand)
export class DeleteNumberFromPhoneGroupCommandHandler
  implements ICommandHandler<DeleteNumberFromPhoneGroupCommand>
{
  constructor(
    @InjectRepository(SmsGroupEntity)
    private readonly groupRepository: Repository<SmsGroupEntity>,
    @InjectRepository(SmsGroupNumberEntity)
    private readonly groupNumberRepository: Repository<SmsGroupNumberEntity>,
  ) {}

  async execute({
    groupNumberId,
    user,
    groupId,
  }: DeleteNumberFromPhoneGroupCommand) {
    const group = await this.groupRepository.findOneOrFail({
      where: { id: groupId, userId: user.uid },
    });

    await this.groupNumberRepository.delete({
      id: groupNumberId,
      groupId: group.id,
    });

    return true;
  }
}
