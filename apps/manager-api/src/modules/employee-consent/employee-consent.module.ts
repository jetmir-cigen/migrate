import { Module } from '@nestjs/common';
import { EmployeeConsentController } from './employee-consent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

import {
  CreateEmployeeConsentCommandHandler,
  RevokeEmployeeConsentCommandHandler,
} from './commands';
import { GetEmployeeConsentsQueryHandler } from './queries';
import {
  EmployeeConsentCostObjectEntity,
  EmployeeConsentEntity,
} from '@skytech/db';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EmployeeConsentEntity,
      EmployeeConsentCostObjectEntity,
    ]),
    CqrsModule,
  ],
  controllers: [EmployeeConsentController],
  providers: [
    CreateEmployeeConsentCommandHandler,
    GetEmployeeConsentsQueryHandler,
    RevokeEmployeeConsentCommandHandler,
  ],
})
export class EmployeeConsentModule {}
