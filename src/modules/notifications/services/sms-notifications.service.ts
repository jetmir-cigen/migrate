import { Injectable } from '@nestjs/common';
import { catchError, lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import {
  INumber,
  ISendBulkNotification,
  ISendNotification,
} from '../dto/send-notification.dto';
import { LogSmsPushEntity } from '@/modules/phone/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';

@Injectable()
export class SmsNotificationsService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(LogSmsPushEntity)
    private readonly repository: Repository<LogSmsPushEntity>,
  ) {}

  joinNumbers(numbers: INumber[]) {
    return numbers.map((item) => `${item.countryId}${item.number}`).join(',');
  }

  async insertLogs(data: ISendNotification) {
    const {
      sender,
      message,
      numbers,
      isPrivate,
      code,
      response,
      customerId,
      userId,
    } = data;
    const batchId = v4();

    const logs = numbers.map((receiver) => {
      return this.repository.create({
        sent: new Date(),
        message,
        receiver: receiver.number,
        land: receiver.countryId.toString(),
        sender: sender || 'Skytech',
        customerId,
        userId,
        type: code,
        isPrivate: isPrivate ? 1 : 0,
        batchId,
        response,
      });
    });

    return this.repository.upsert(logs, [
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
  }

  async send(data: ISendNotification) {
    const { sender, message, numbers } = data;

    const formData = new FormData();

    formData.append('sender', sender);
    formData.append('message', message);
    formData.append('numbers', this.joinNumbers(numbers));
    formData.append('test', 'true');
    formData.append('apiKey', `Mzk0Mzc5NGEzMjQ3NDEzOTQxNTczNTU5NWE0MjMxNmI=`);
    formData.append('custom', 'batch');
    formData.append('output', 'true');

    const { data: response } = await lastValueFrom(
      this.httpService.post(`https://api.txtlocal.com/send/`, formData).pipe(
        catchError((error: AxiosError) => {
          throw 'An error happened!';
        }),
      ),
    );

    if (Array.isArray(response.errors) && response.errors.length > 0) {
      this.insertLogs({ ...data, response: JSON.stringify(response.errors) });
    } else {
      this.insertLogs({ ...data, response: response.status });
      return response;
    }
  }

  async sendBulk(data: ISendBulkNotification) {
    const { sender, receivers } = data;
    const formData = new FormData();

    formData.append('sender', sender);

    receivers.forEach((item, index) => {
      formData.append(
        `messages[${index}][number]`,
        this.joinNumbers([item.number]),
      );
      formData.append(`messages[${index}][text]`, item.text);
    });

    formData.append('test', 'true');
    formData.append('apiKey', `Mzk0Mzc5NGEzMjQ3NDEzOTQxNTczNTU5NWE0MjMxNmI=`);
    formData.append('custom', 'batch');
    formData.append('output', 'true');

    const { data: response } = await lastValueFrom(
      this.httpService
        .post(`https://api.txtlocal.com/bulk_json/`, formData)
        .pipe(
          catchError((error: AxiosError) => {
            throw 'An error happened!';
          }),
        ),
    );

    if (Array.isArray(response.errors) && response.errors.length > 0) {
      this.insertBulkLogs({
        ...data,
        response: JSON.stringify(response.errors),
      });
    } else {
      this.insertBulkLogs({
        ...data,
        response: response.status,
      });
      return response;
    }
  }

  async insertBulkLogs(data: ISendBulkNotification) {
    const { code, receivers, sender, userId, isPrivate } = data;

    const batchId = v4();

    const logs = receivers.map((item) => {
      return this.repository.create({
        sent: new Date(),
        message: item.text,
        receiver: item.number.number,
        land: item.number.countryId.toString(),
        sender: sender || 'Skytech',
        customerId: item.customerId,
        userId: userId,
        type: code,
        isPrivate: isPrivate ? 1 : 0,
        batchId,
      });
    });

    return this.repository.upsert(logs, [
      'receiver',
      'sent',
      'message',
      'sender',
      'customerId',
      'userId',
      'type',
      'land',
      'batchId',
      'isPrivate',
    ]);
  }
}
