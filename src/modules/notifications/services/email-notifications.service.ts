import { Injectable, Logger } from '@nestjs/common';
import { ISendNotification } from '../dto/send-notification.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectRepository } from '@nestjs/typeorm';
import { LogMailEntity } from '../entities/log-mail.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailNotificationsService {
  private readonly logger = new Logger(EmailNotificationsService.name);

  constructor(
    private readonly mailerService: MailerService,
    @InjectRepository(LogMailEntity)
    private readonly repository: Repository<LogMailEntity>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
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
    const production =
      this.configService.get('environment').toLowerCase() === 'production';

    if (production) {
      return this.sendProduction(data);
    } else {
      return this.sendDevelopment(data);
    }
  }

  async sendDevelopment(data: ISendNotification) {
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
  }

  async sendProduction(data: ISendNotification) {
    const formData = new FormData();

    formData.append('code', data.numbers[0].number);
    formData.append('type', data.code);
    formData.append('receiver', data.emails[0]);
    formData.append('subject', data.subject);
    formData.append('message', data.message);
    formData.append('customerId', data.customerId.toString());
    formData.append('cc', '');
    formData.append('bcc', '');

    const { data: response } = await lastValueFrom(
      this.httpService
        .post('https://control.skytechcontrol.io/web/api/mail.php', formData)
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error);
            throw error;
          }),
        ),
    );

    this.logger.log(response);

    return response;
  }
}
