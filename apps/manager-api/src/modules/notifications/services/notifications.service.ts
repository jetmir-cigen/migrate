import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseTextTemplate } from '../types';
import { SmsNotificationsService } from './sms-notifications.service';
import { EmailNotificationsService } from './email-notifications.service';
import {
  ISendBulkNotification,
  ISendNotification,
} from '../dto/send-notification.dto';
import { IUser } from '@skytech/auth';
import { CostObjectEntity, TextTemplateEntity, UserEntity } from '@skytech/db';

export interface IParams {
  data: Map<number, BaseTextTemplate>;
}

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(UserEntity)
    protected readonly userRepository: Repository<UserEntity>,
    @InjectRepository(CostObjectEntity)
    protected readonly costObjectRepository: Repository<CostObjectEntity>,
    @InjectRepository(TextTemplateEntity)
    protected readonly ttRepository: Repository<TextTemplateEntity>,
    private readonly smsService: SmsNotificationsService,
    private readonly emailService: EmailNotificationsService,
  ) {}

  injectDataToContent(
    content: string,
    data: Record<string, string> = {},
  ): string {
    return Object.entries(data).reduce(
      (acc, [key, value]) => acc.replace(`{${key}}`, value),
      content,
    );
  }

  async sendToUser(id: number, data: BaseTextTemplate, user: IUser) {
    const query = await this.userRepository
      .createQueryBuilder('u')
      .innerJoinAndSelect('u.customer', 'c')
      .innerJoinAndMapOne(
        'u.textTemplate',
        TextTemplateEntity,
        'tt',
        'tt.code = :code',
        {
          code: data.constructor['code'],
        },
      )
      .where('u.id = :id', { id })
      .orderBy(
        `(CASE WHEN tt.customer_id = c.id THEN 8 ELSE 0 END) +
      (CASE WHEN tt.customer_head_id = c.customer_head_id THEN 4 ELSE 0 END) +
      (CASE WHEN tt.whitelabel_id = c.whitelabel_id THEN 2 ELSE 0 END) +
      (CASE WHEN tt.locale = u.locale THEN 1 ELSE 0 END)`,
        'DESC',
      )
      .distinctOn(['id'])
      .getOne();

    const result = {
      sender: query.textTemplate.sender,
      numbers: [{ countryId: query.countryId, number: query.phoneNumber }],
      emails: [query.email],
      message: this.injectDataToContent(query.textTemplate.text, data.text),
      type: query.textTemplate.type,
      subject: this.injectDataToContent(
        query.textTemplate.subject,
        data?.subject,
      ),
      code: data.constructor['code'],
      userId: user.uid,
      customerId: query.customerId,
    };

    this.send(result);

    return { query };
  }

  async sendToCostObject(id: number, data: BaseTextTemplate, user: IUser) {
    const query = await this.costObjectRepository
      .createQueryBuilder('costObject')
      .innerJoinAndSelect('costObject.customer', 'c')
      .innerJoinAndMapOne(
        'costObject.textTemplate',
        TextTemplateEntity,
        'tt',
        'tt.code = :code',
        {
          code: data.constructor['code'],
        },
      )
      .where('costObject.id = :id', { id })
      .orderBy(
        `(CASE WHEN tt.customer_id = c.id THEN 8 ELSE 0 END) +
      (CASE WHEN tt.customer_head_id = c.customer_head_id THEN 4 ELSE 0 END) +
      (CASE WHEN tt.whitelabel_id = c.whitelabel_id THEN 2 ELSE 0 END) +
      (CASE WHEN tt.locale = costObject.locale THEN 1 ELSE 0 END)`,
        'DESC',
      )
      .distinctOn(['id'])
      .getOne();

    const result = {
      sender: query.textTemplate.sender,
      numbers: [{ countryId: query.countryId, number: query.code }],
      emails: [query.email],
      message: this.injectDataToContent(query.textTemplate.text, data.text),
      type: query.textTemplate.type,
      subject: this.injectDataToContent(
        query.textTemplate.subject,
        data?.subject,
      ),
      code: data.constructor['code'],
      userId: user.uid,
      customerId: query.customerId,
    };

    await this.send(result);

    return { query };
  }

  async sendToUsers(params: IParams, code: string, user: IUser) {
    const { data } = params;

    // for each data check if value.constructor['code'] === code
    // if not remove from map
    data.forEach((value, key) => {
      if (value.constructor['code'] !== code) {
        data.delete(key);
      }
    });

    const query = await this.userRepository
      .createQueryBuilder('u')
      .innerJoinAndSelect('u.customer', 'c')
      .innerJoinAndMapOne(
        'u.textTemplate',
        TextTemplateEntity,
        'tt',
        'tt.code = :code',
        {
          code,
        },
      )
      .where('u.id IN (:...ids)', { ids: [...data.keys()] })
      .orderBy(
        `(CASE WHEN tt.customer_id = c.id THEN 8 ELSE 0 END) +
      (CASE WHEN tt.customer_head_id = c.customer_head_id THEN 4 ELSE 0 END) +
      (CASE WHEN tt.whitelabel_id = c.whitelabel_id THEN 2 ELSE 0 END) +
      (CASE WHEN tt.locale = u.locale THEN 1 ELSE 0 END)`,
        'DESC',
      )
      .distinctOn(['id'])
      .getMany();

    let type: string;
    let sender: string;

    const result = query.map((item) => {
      type = item.textTemplate.type;
      sender = item.textTemplate.sender;
      return {
        number: { countryId: item.countryId, number: item.phoneNumber },
        email: item.email,
        text: this.injectDataToContent(
          item.textTemplate.text,
          data.get(item.id).text,
        ),
        type: item.textTemplate.type,
        subject: this.injectDataToContent(
          item.textTemplate.subject,
          data.get(item.id)?.subject,
        ),
        userId: user.uid,
        customerId: item.customerId,
      };
    });

    const dataBulk: ISendBulkNotification = {
      code,
      sender,
      type,
      receivers: result,
      userId: user.uid,
    };

    await this.sendBulk(dataBulk);

    return { query };
  }

  async send(data: ISendNotification) {
    const { type } = data;

    switch (type) {
      case 'SMS':
        await this.smsService.send(data);
        break;
      case 'EMAIL':
        await this.emailService.send(data);
        break;
      default:
        break;
    }
  }

  async sendBulk(data: ISendBulkNotification) {
    const { type } = data;

    switch (type) {
      case 'SMS':
        await this.smsService.sendBulk(data);
        break;
      case 'EMAIL':
        // await this.emailService.send(data);
        break;
      default:
        break;
    }
  }
}
