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
  CreateTelePolicyCommandHandler,
  DeleteTelePolicyCommandHandler,
  UpdateTelePolicyCommandHandler,
} from './commands';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      SalaryDeductionProfileEntity,
      TelePolicyTemplateEntity,
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
    FindTelePolicyTemplatesByFilterQueryHandler,
  ],
})
export class TelePolicyModule {}
