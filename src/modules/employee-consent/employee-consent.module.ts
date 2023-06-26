import { Module } from '@nestjs/common';
import { EmployeeConsentController } from './employee-consent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeConsentEntity } from './entities/employee-consent.entity';
import { EmployeeConsentCostObjectEntity } from '@/common/entities/employee-consent-cost-object.entity';
import {
  CreateEmployeeConsentCommand,
  CreateEmployeeConsentCommandHandler,
} from './employee-consent.command';
import {
  GetEmployeeConsentsQuery,
  GetEmployeeConsentsQueryHandler,
} from './get-employee-consents.query';
import { CqrsModule } from '@nestjs/cqrs';

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
    CreateEmployeeConsentCommand,
    GetEmployeeConsentsQuery,
    GetEmployeeConsentsQueryHandler,
  ],
})
export class EmployeeConsentModule {}
