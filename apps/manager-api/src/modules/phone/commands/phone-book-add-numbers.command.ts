import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { SmsPhoneBookEntity } from '../entities/sms-phone-book.entity';
import { IUser } from '@skytech/auth';

export class AddNumbersToPhoneBookCommand {
  constructor(
    public readonly user: IUser,
    public readonly data: {
      number: string;
      name: string;
      countryId: number;
    }[],
  ) {}
}

@CommandHandler(AddNumbersToPhoneBookCommand)
export class AddNumbersToPhoneBookCommandHandler
  implements ICommandHandler<AddNumbersToPhoneBookCommand>
{
  constructor(
    @InjectRepository(SmsPhoneBookEntity)
    private readonly repository: Repository<SmsPhoneBookEntity>,
  ) {}

  async execute({ data, user }: AddNumbersToPhoneBookCommand) {
    const numbers = data.map(({ number, name, countryId }) => {
      return this.repository.create({
        userId: user.uid,
        phoneNumber: number,
        name,
        countryId,
      });
    });

    const savedGroupNumbers = await this.repository.upsert(numbers, [
      'userId',
      'phoneNumber',
      'countryId',
    ]);

    return savedGroupNumbers;
  }
}
