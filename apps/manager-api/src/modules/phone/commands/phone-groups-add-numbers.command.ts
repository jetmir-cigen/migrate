import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from '@skytech/auth';
import { SmsGroupEntity, SmsGroupNumberEntity } from '@skytech/db';

export class AddNumbersToPhoneGroupCommand {
  constructor(
    public readonly user: IUser,
    public readonly groupId: number,
    public readonly data: {
      number: string;
      name: string;
      countryId: number;
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

    const groupNumbers = data.map(({ number, name, countryId }) => {
      return this.groupNumberRepository.create({
        groupId: group.id,
        number,
        name,
        countryId,
      });
    });

    const savedGroupNumbers = await this.groupNumberRepository.upsert(
      groupNumbers,
      ['groupId', 'number', 'countryId'],
    );

    return savedGroupNumbers;
  }
}
