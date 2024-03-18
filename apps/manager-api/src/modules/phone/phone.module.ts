import { Module } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { PhoneController } from './phone.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostObjectEntity } from '@skytech/manager/common/entities/cost-object.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { DepartmentService } from '../department/department.service';
import { FindTelePoliciesByFilterQueryHandler } from '../tele-policy/queries';
import { DepartmentEntity } from '../department/entities/department.entity';
import { SalaryDeductionProfileEntity } from '../tele-policy/entities/salary-deduction-profile.entity';
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
  ActiveMobileUserView,
  ManagerAccessCustomerView,
  ManagerAccessDepartmentView,
} from '@skytech/manager/common/views';
import {
  LogSmsPushEntity,
  SmsGroupEntity,
  SmsGroupNumberEntity,
  SmsPhoneBookEntity,
} from './entities';
import {
  EmailNotificationsService,
  NotificationsService,
  SmsNotificationsService,
} from '../notifications/services';
import { UserEntity } from '../user/entities/user.entity';
import { TextTemplateEntity } from '../text-template/entities';
import { HttpModule } from '@nestjs/axios';
import { LogMailEntity } from '../notifications/entities/log-mail.entity';
import { FindUserAliasesByFilterQueryHandler } from './queries/get-user-aliases.query';
import { UserAliasEntity } from './entities/user-alias.entity';

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
