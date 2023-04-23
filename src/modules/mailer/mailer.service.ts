import { Injectable } from '@nestjs/common';
import { MailerService as NestJsMailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailerService {
  constructor(private readonly mailerService: NestJsMailerService) {}

  async sendTestEmail(email: string, verificationCode: number) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'some subject',
      template: 'test',
      context: {
        verificationCode,
      },
    });
  }
}
