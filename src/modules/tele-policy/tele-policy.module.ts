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
import { SalaryDeductionProfileEntity } from './entities/salary-deduction-profile.entity';
import { TelePolicyTemplateEntity } from './entities/tele-policy-template.entity';
import {
  AssignTelePolicyCommandHandler,
  CreateTelePolicyCommandHandler,
  DeleteTelePolicyCommandHandler,
  UpdateTelePolicyCommandHandler,
} from './commands';
import { CostObjectEntity } from '@/common/entities/cost-object.entity';

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
