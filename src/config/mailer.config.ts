import { MailerOptions } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import * as path from 'path';
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const mailerAsyncConfig: MailerAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<MailerOptions> => ({
    transport: {
      host: configService.get('SMTP_HOST'),
      port: configService.get('SMTP_PORT'),
      secure: configService.get('SMTP_SECURE'),
      auth: {
        user: configService.get('SMTP_USER'),
        pass: configService.get('SMTP_PASS'),
      },
    },
    defaults: {
      from: 'Your App <noreply@your-app.com>',
    },
    template: {
      dir: path.join(__dirname, '../../email/templates'),
      adapter: new PugAdapter(),
      options: {
        strict: true,
      },
    },
  }),
};
