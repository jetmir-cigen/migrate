import { Module } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { PhoneController } from './phone.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { DepartmentService } from '../department/department.service';
import { FindTelePoliciesByFilterQueryHandler } from '../tele-policy/queries';
import {
  FindActiveNumbersByFilterQueryHandler,
  FindAllActiveNumbersByFilterQueryHandler,
  FindGroupNumbersByFilterQueryHandler,
  FindPhoneBooksByFilterQueryHandler,
  FindPhoneGroupByFilterQueryHandler,
  FindPhoneGroupNumbersByFilterQueryHandler,
  FindPhoneGroupsByFilterQueryHandler,
  GetSMSLogsByBatchFilterQueryHandler,
  GetSMSLogsByFilterQueryHandler,
} from './queries';
import {
  AddNumbersToPhoneBookCommandHandler,
  AddNumbersToPhoneGroupCommandHandler,
  CreatePhoneGroupCommandHandler,
  DeleteNumberFromPhoneGroupCommandHandler,
  DeletePhoneGroupCommandHandler,
  SendSMSCommandHandler,
  UpdatePhoneBookNumberCommandHandler,
  UpdatePhoneGroupCommandHandler,
  UpdatePhoneGroupNumberCommandHandler,
} from './commands';

import {
  EmailNotificationsService,
  NotificationsService,
  SmsNotificationsService,
} from '../notifications/services';
import { HttpModule } from '@nestjs/axios';
import { FindUserAliasesByFilterQueryHandler } from './queries/get-user-aliases.query';
import {
  ActiveMobileUserView,
  CostObjectEntity,
  DepartmentEntity,
  LogMailEntity,
  LogSmsPushEntity,
  ManagerAccessCustomerView,
  ManagerAccessDepartmentView,
  SalaryDeductionProfileEntity,
  SmsGroupEntity,
  SmsGroupNumberEntity,
  SmsPhoneBookEntity,
  TextTemplateEntity,
  UserAliasEntity,
  UserEntity,
} from '@skytech/db';

@Module({
  imports: [
    CqrsModule,
    HttpModule,
    TypeOrmModule.forFeature([
      CostObjectEntity,
      ActiveMobileUserView,
      ManagerAccessDepartmentView,
      ManagerAccessCustomerView,
      DepartmentEntity,
      SalaryDeductionProfileEntity,
      SmsGroupEntity,
      SmsPhoneBookEntity,
      SmsGroupNumberEntity,
      LogSmsPushEntity,
      LogMailEntity,
      UserEntity,
      TextTemplateEntity,
      UserAliasEntity,
    ]),
  ],
  controllers: [PhoneController],
  providers: [
    PhoneService,
    FindActiveNumbersByFilterQueryHandler,
    FindGroupNumbersByFilterQueryHandler,
    DepartmentService,
    FindTelePoliciesByFilterQueryHandler,
    FindPhoneGroupsByFilterQueryHandler,
    FindPhoneGroupByFilterQueryHandler,
    CreatePhoneGroupCommandHandler,
    UpdatePhoneGroupCommandHandler,
    DeletePhoneGroupCommandHandler,
    AddNumbersToPhoneGroupCommandHandler,
    AddNumbersToPhoneBookCommandHandler,
    FindPhoneGroupNumbersByFilterQueryHandler,
    DeleteNumberFromPhoneGroupCommandHandler,
    SendSMSCommandHandler,
    GetSMSLogsByFilterQueryHandler,
    GetSMSLogsByBatchFilterQueryHandler,
    FindPhoneBooksByFilterQueryHandler,
    FindAllActiveNumbersByFilterQueryHandler,
    UpdatePhoneBookNumberCommandHandler,
    UpdatePhoneGroupNumberCommandHandler,
    FindUserAliasesByFilterQueryHandler,
    NotificationsService,
    SmsNotificationsService,
    EmailNotificationsService,
  ],
})
export class PhoneModule {}
