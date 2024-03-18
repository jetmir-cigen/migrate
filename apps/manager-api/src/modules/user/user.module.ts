import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { HttpModule } from '@nestjs/axios';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { FindUsersByFilterQueryHandler } from './queries/find-users.query';
import { UserGroupEntity } from './entities/user-group.entity';
import {
  CreateUserCommandHandler,
  DeleteUserCommandHandler,
  UpdateUserCommandHandler,
} from '@skytech/manager/modules/user/commands';
import {
  UserCreatedEventHandler,
  UserUpdatedEventHandler,
  UserDeletedEventHandler,
  UserPasswordGeneratedEventHandler,
} from '@skytech/manager/modules/user/events';
import { GetUserByIdQueryHandler } from '@skytech/manager/modules/user/queries/get-user-by-id.query';
import { CustomerEntity } from '@skytech/manager/modules/customer/entities/customer.entity';
import { GetCustomerQueryHandler } from '@skytech/manager/modules/user/queries/get-customers.query';
import { GenerateUserPasswordCommandHandler } from './commands/user-generate-password.command';
import {
  EmailNotificationsService,
  NotificationsService,
  SmsNotificationsService,
} from '../notifications/services';
import { LogSmsPushEntity } from '../phone/entities';
import { LogMailEntity } from '../notifications/entities/log-mail.entity';
import { CostObjectEntity } from '@skytech/manager/common/entities/cost-object.entity';
import { TextTemplateEntity } from '../text-template/entities';

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
