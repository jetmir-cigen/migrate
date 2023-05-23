import { Module } from '@nestjs/common';
import { EmployeeConsentController } from './employee-consent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeConsentEntity } from './entities/employee-consent.entity';
import { EmployeeConsentCostObjectEntity } from '@/common/entities/employee-consent-cost-object.entity';
import { CreateEmployeeConsentCommandHandler } from './employee-consent.command';
import { GetEmployeeConsentsQuery } from './get-employee-consents.query';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EmployeeConsentEntity,
      EmployeeConsentCostObjectEntity,
    ]),
  ],
  controllers: [EmployeeConsentController],
  providers: [CreateEmployeeConsentCommandHandler, GetEmployeeConsentsQuery],
})
export class EmployeeConsentModule {}
