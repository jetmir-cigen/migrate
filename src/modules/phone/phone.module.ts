import { Module } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { PhoneController } from './phone.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostObjectEntity } from '@/common/entities/cost-object.entity';
import { ActiveMobileUserView } from '@/common/views/active-mobile-users.view';
import { ManagerAccessDepartmentView } from '@/common/views/manager-access-department.view';
import { CqrsModule } from '@nestjs/cqrs';
import { DepartmentService } from '../department/department.service';
import { FindTelePoliciesByFilterQueryHandler } from '../tele-policy/queries';
import { DepartmentEntity } from '../department/entities/department.entity';
import { SalaryDeductionProfileEntity } from '../tele-policy/entities/salary-deduction-profile.entity';
import {
  FindActiveNumbersByFilterQueryHandler,
  FindGroupNumbersByFilterQueryHandler,
  FindPhoneGroupByFilterQueryHandler,
  FindPhoneGroupNumbersByFilterQueryHandler,
  FindPhoneGroupsByFilterQueryHandler,
  GetSMSLogsByBatchFilterQueryHandler,
  GetSMSLogsByFilterQueryHandler,
} from './queries';
import { SmsGroupEntity } from './entities/sms-group.entity';
import { SmsPhoneBookEntity } from './entities/sms-phone-book.entity';
import { SmsGroupNumberEntity } from './entities/sms-group-number.entity';
import {
  AddNumbersToPhoneGroupCommandHandler,
  CreatePhoneGroupCommandHandler,
  DeleteNumberFromPhoneGroupCommandHandler,
  DeletePhoneGroupCommandHandler,
  SendSMSCommandHandler,
  UpdatePhoneGroupCommandHandler,
} from './commands';
import { LogSmsPushEntity } from './entities/log-sms-push.entity';
import { ManagerAccessCustomerView } from '@/common/views/manager-access-customer.view';
import { FindPhoneBooksByFilterQueryHandler } from './queries/get-phone-books.query';

@Module({
  imports: [
    CqrsModule,
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
    FindPhoneGroupNumbersByFilterQueryHandler,
    DeleteNumberFromPhoneGroupCommandHandler,
    SendSMSCommandHandler,
    GetSMSLogsByFilterQueryHandler,
    GetSMSLogsByBatchFilterQueryHandler,
    FindPhoneBooksByFilterQueryHandler,
  ],
})
export class PhoneModule {}
