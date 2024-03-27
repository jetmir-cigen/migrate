import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  EmployeeConsentCostObjectEntity,
  EmployeeConsentEntity,
} from '@skytech/db';

import {
  CreateEmployeeConsentCommandHandler,
  RevokeEmployeeConsentCommandHandler,
} from './commands';
import { EmployeeConsentController } from './employee-consent.controller';
import { GetEmployeeConsentsQueryHandler } from './queries';

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
