import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IUser } from '@skytech/auth';
import { SmsGroupEntity, SmsGroupNumberEntity } from '@skytech/db';

export class UpdatePhoneGroupNumberCommand {
  constructor(
    public readonly user: IUser,
    public readonly groupId: number,
    public readonly numberId: number,
    public readonly data: {
      number: string;
      name: string;
      countryId: number;
    },
  ) {}
}

@CommandHandler(UpdatePhoneGroupNumberCommand)
export class UpdatePhoneGroupNumberCommandHandler
  implements ICommandHandler<UpdatePhoneGroupNumberCommand>
{
  constructor(
    @InjectRepository(SmsGroupEntity)
    private readonly groupRepository: Repository<SmsGroupEntity>,
    @InjectRepository(SmsGroupNumberEntity)
    private readonly groupNumberRepository: Repository<SmsGroupNumberEntity>,
  ) {}

  async execute({
    data,
    user,
    groupId,
    numberId,
  }: UpdatePhoneGroupNumberCommand) {
    const group = await this.groupRepository.findOneOrFail({
      where: { id: groupId, userId: user.uid },
    });

    let number = await this.groupNumberRepository.findOneOrFail({
      where: { id: numberId, groupId: group.id },
    });

    number = {
      ...number,
      ...data,
    };

    number.name = data.name;
    number.countryId = data.countryId;
    number.number = data.number;

    await this.groupNumberRepository.save(number);

    return number;
  }
}
