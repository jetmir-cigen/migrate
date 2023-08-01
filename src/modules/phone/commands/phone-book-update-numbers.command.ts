import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { SmsPhoneBookEntity } from '../entities/sms-phone-book.entity';

export class UpdatePhoneBookNumberCommand {
  constructor(
    public readonly user: Express.User,
    public readonly numberId: number,
    public readonly data: {
      number: string;
      name: string;
      countryId: number;
    },
  ) {}
}

@CommandHandler(UpdatePhoneBookNumberCommand)
export class UpdatePhoneBookNumberCommandHandler
  implements ICommandHandler<UpdatePhoneBookNumberCommand>
{
  constructor(
    @InjectRepository(SmsPhoneBookEntity)
    private readonly repository: Repository<SmsPhoneBookEntity>,
  ) {}

  async execute({ data, user, numberId }: UpdatePhoneBookNumberCommand) {
    let number = await this.repository.findOneOrFail({
      where: { userId: user.uid, id: numberId },
    });

    console.log({ data });

    number = {
      ...number,
      ...data,
    };

    await this.repository.save(number);

    return number;
  }
}
