import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LogSmsPushEntity } from '../entities/log-sms-push.entity';
import { NotificationsService } from '@skytech/manager/modules/notifications/services';
import { ISendNotification } from '@skytech/manager/modules/notifications/dto/send-notification.dto';
import { IUser } from '@skytech/auth';

export class SendSMSCommand {
  constructor(
    public readonly data: {
      user: IUser;
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

    await this.notificationService.send(test);

    return true;
  }
}
