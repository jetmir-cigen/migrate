import { Module } from '@nestjs/common';
import { TelePolicyService } from './tele-policy.service';
import { TelePolicyController } from './tele-policy.controller';
import {
  FindTelePoliciesByFilterQueryHandler,
  FindTelePolicyTemplatesByFilterQueryHandler,
  GetTelePolicyByFilterQueryHandler,
} from './queries';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AssignTelePolicyCommandHandler,
  CreateTelePolicyCommandHandler,
  DeleteTelePolicyCommandHandler,
  UpdateTelePolicyCommandHandler,
} from './commands';
import {
  CostObjectEntity,
  SalaryDeductionProfileEntity,
  TelePolicyTemplateEntity,
} from '@skytech/db';

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
