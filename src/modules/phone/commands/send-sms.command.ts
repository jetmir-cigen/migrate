import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { v4 } from 'uuid';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LogSmsPushEntity } from '../entities/log-sms-push.entity';
import { NotificationsService } from '@/modules/notifications/services';
import { ISendNotification } from '@/modules/notifications/dto/send-notification.dto';

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
    private readonly notificationService: NotificationsService,
  ) {}

  async execute({ data }: SendSMSCommand) {
    const { user, sender, message, receivers, isPrivate } = data;

    const test: ISendNotification = {
      sender,
      message,
      numbers: receivers.map((receiver) => ({
        countryId: receiver.countryId,
        number: receiver.number,
      })),
      type: 'SMS',
      code: 'SMS_SENDER',
      userId: user.uid,
      customerId: user.cid,
      isPrivate: isPrivate,
    };

    this.notificationService.send(test);

    return true;
  }
}
