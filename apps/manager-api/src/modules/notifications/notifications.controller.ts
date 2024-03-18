import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { NotificationsService } from './services';
import { SMSTestTextTemplate, WelcomeEmailTextTemplate } from './types';
import { AuthGuard } from '../auth/auth.guard';
import { AuthUser } from '../auth/auth-user.decorator';

@UseGuards(AuthGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationService: NotificationsService) {}

  @Post('/cost-object')
  sendToCostObject(@Body() data: any, @AuthUser() user: Express.User) {
    // this.emailNotificationService.sendEmail();
    const params = new SMSTestTextTemplate(data.text);
    return this.notificationService.sendToCostObject(253202, params, user);
  }

  @Post('/user')
  sendToUser(@Body() data: any, @AuthUser() user: Express.User) {
    const params = new WelcomeEmailTextTemplate(data.text);

    return this.notificationService.sendToUser(9061, params, user);
  }

  @Post('/users')
  sendToUsers(@Body() data: any, @AuthUser() user: Express.User) {
    // this.emailNotificationService.sendEmail();
    const map = new Map();
    const values = new SMSTestTextTemplate(data);
    map.set(9061, values);
    map.set(9060, values);

    return this.notificationService.sendToUsers(
      {
        data: map,
      },
      'SMS_TEST',
      user,
    );
  }
}
