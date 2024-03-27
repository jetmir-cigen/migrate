import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

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

import { DepartmentService } from '../department/department.service';
import {
  EmailNotificationsService,
  NotificationsService,
  SmsNotificationsService,
} from '../notifications/services';
import { FindTelePoliciesByFilterQueryHandler } from '../tele-policy/queries';

import { FindUserAliasesByFilterQueryHandler } from './queries/get-user-aliases.query';
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
import { PhoneController } from './phone.controller';
import { PhoneService } from './phone.service';
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
