import { Injectable } from '@nestjs/common';
import { ISendNotification } from '../dto/send-notification.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectRepository } from '@nestjs/typeorm';
import { LogMailEntity } from '../entities/log-mail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmailNotificationsService {
  constructor(
    private readonly mailerService: MailerService,
    @InjectRepository(LogMailEntity)
    private readonly repository: Repository<LogMailEntity>,
  ) {}

  async insertLogs(data: ISendNotification) {
    const { message, emails, code, response, subject, customerId } = data;

    const logs = emails.map((receiver) => {
      return this.repository.create({
        sent: new Date(),
        body: message,
        mailRecipient: receiver,
        subject,
        code,
        customerId,
        resultMessage: response,
      });
    });

    return this.repository.upsert(logs, [
      'sent',
      'body',
      'subject',
      'code',
      'customerId',
      'resultMessage',
    ]);
  }

  async send(data: ISendNotification) {
    const { sender, message, emails, subject } = data;

    try {
      const resp = await this.mailerService.sendMail({
        from: sender,
        to: emails,
        subject: subject,
        text: message,
        html: message,
      });

      await this.insertLogs({
        ...data,
        response: JSON.stringify(resp.response),
      });
    } catch (error) {
      await this.insertLogs({
        ...data,
        response: JSON.stringify(error),
      });
    }

    return true;
  }
}
