import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  CostObjectEntity,
  CustomerEntity,
  LogMailEntity,
  LogSmsPushEntity,
  TextTemplateEntity,
  UserEntity,
  UserGroupEntity,
} from '@skytech/db';
import {
  CreateUserCommandHandler,
  DeleteUserCommandHandler,
  UpdateUserCommandHandler,
} from '@skytech/manager/modules/user/commands';
import {
  UserCreatedEventHandler,
  UserDeletedEventHandler,
  UserPasswordGeneratedEventHandler,
  UserUpdatedEventHandler,
} from '@skytech/manager/modules/user/events';
import { GetCustomerQueryHandler } from '@skytech/manager/modules/user/queries/get-customers.query';
import { GetUserByIdQueryHandler } from '@skytech/manager/modules/user/queries/get-user-by-id.query';

import {
  EmailNotificationsService,
  NotificationsService,
  SmsNotificationsService,
} from '../notifications/services';

import { GenerateUserPasswordCommandHandler } from './commands/user-generate-password.command';
import { FindUsersByFilterQueryHandler } from './queries/find-users.query';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      UserEntity,
      UserGroupEntity,
      CustomerEntity,
      LogSmsPushEntity,
      LogMailEntity,
      CostObjectEntity,
      TextTemplateEntity,
    ]),
    HttpModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    FindUsersByFilterQueryHandler,
    GetUserByIdQueryHandler,
    GetCustomerQueryHandler,
    CreateUserCommandHandler,
    UpdateUserCommandHandler,
    DeleteUserCommandHandler,
    UserCreatedEventHandler,
    UserUpdatedEventHandler,
    UserDeletedEventHandler,
    UserPasswordGeneratedEventHandler,
    GenerateUserPasswordCommandHandler,
    NotificationsService,
    SmsNotificationsService,
    EmailNotificationsService,
  ],
})
export class UserModule {}
