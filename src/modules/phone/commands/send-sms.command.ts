import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { v4 } from 'uuid';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LogSmsPushEntity } from '../entities/log-sms-push.entity';

export class SendSMSCommand {
  constructor(
    public readonly data: {
      user: Express.User;
      sender: string;
      message: string;
      receivers: {
        number: string;
        name: string;
        countryId: number;
      }[];
      isPrivate: boolean;
    },
  ) {}
}

@CommandHandler(SendSMSCommand)
export class SendSMSCommandHandler implements ICommandHandler<SendSMSCommand> {
  constructor(
    @InjectRepository(LogSmsPushEntity)
    private readonly repository: Repository<LogSmsPushEntity>,
  ) {}

  async execute({ data }: SendSMSCommand) {
    const { user, sender, message, receivers, isPrivate } = data;

    const batchId = v4();

    const logs = receivers.map((receiver) =>
      this.repository.create({
        sent: new Date(),
        message: message,
        response: 'OK',
        receiver: receiver.number,
        land: receiver.countryId.toString(),
        sender: sender,
        customerId: user.cid,
        userId: user.uid,
        type: 'SMS_SENDER',
        batchId,
        isPrivate: isPrivate ? 1 : 0,
      }),
    );

    const result = await this.repository.upsert(logs, [
      'receiver',
      'sent',
      'message',
      'response',
      'sender',
      'customerId',
      'userId',
      'type',
      'land',
      'batchId',
      'isPrivate',
    ]);

    return result;
  }
}
