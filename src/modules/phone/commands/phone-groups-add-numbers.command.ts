import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SmsGroupEntity } from '../entities/sms-group.entity';
import { SmsGroupNumberEntity } from '../entities/sms-group-number.entity';

export class AddNumbersToPhoneGroupCommand {
  constructor(
    public readonly user: Express.User,
    public readonly groupId: number,
    public readonly data: {
      number: string;
      name: string;
    }[],
  ) {}
}

@CommandHandler(AddNumbersToPhoneGroupCommand)
export class AddNumbersToPhoneGroupCommandHandler
  implements ICommandHandler<AddNumbersToPhoneGroupCommand>
{
  constructor(
    @InjectRepository(SmsGroupEntity)
    private readonly groupRepository: Repository<SmsGroupEntity>,
    @InjectRepository(SmsGroupNumberEntity)
    private readonly groupNumberRepository: Repository<SmsGroupNumberEntity>,
  ) {}

  async execute({ data, user, groupId }: AddNumbersToPhoneGroupCommand) {
    const group = await this.groupRepository.findOneOrFail({
      where: { id: groupId, userId: user.uid },
    });

    const groupNumbers = data.map(({ number, name }) => {
      return this.groupNumberRepository.create({
        groupId: group.id,
        number,
        name,
      });
    });

    const savedGroupNumbers = await this.groupNumberRepository.upsert(
      groupNumbers,
      ['groupId', 'number'],
    );

    return savedGroupNumbers;
  }
}
