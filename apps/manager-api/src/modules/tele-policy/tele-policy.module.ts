import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  CostObjectEntity,
  SalaryDeductionProfileEntity,
  TelePolicyTemplateEntity,
} from '@skytech/db';

import {
  AssignTelePolicyCommandHandler,
  CreateTelePolicyCommandHandler,
  DeleteTelePolicyCommandHandler,
  UpdateTelePolicyCommandHandler,
} from './commands';
import {
  FindTelePoliciesByFilterQueryHandler,
  FindTelePolicyTemplatesByFilterQueryHandler,
  GetTelePolicyByFilterQueryHandler,
} from './queries';
import { TelePolicyController } from './tele-policy.controller';
import { TelePolicyService } from './tele-policy.service';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      SalaryDeductionProfileEntity,
      TelePolicyTemplateEntity,
      CostObjectEntity,
    ]),
  ],
  controllers: [TelePolicyController],
  providers: [
    TelePolicyService,
    FindTelePoliciesByFilterQueryHandler,
    GetTelePolicyByFilterQueryHandler,
    CreateTelePolicyCommandHandler,
    UpdateTelePolicyCommandHandler,
    DeleteTelePolicyCommandHandler,
    AssignTelePolicyCommandHandler,
    FindTelePolicyTemplatesByFilterQueryHandler,
  ],
})
export class TelePolicyModule {}
