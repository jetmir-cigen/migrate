import { Module } from '@nestjs/common';
import { EmployeeConsentService } from './employee-consent.service';
import { EmployeeConsentController } from './employee-consent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeConsentEntity } from './entities/employee-consent.entity';
import { EmployeeConsentCostObjectEntity } from '@/common/entities/employee-consent-cost-object.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EmployeeConsentEntity,
      EmployeeConsentCostObjectEntity,
    ]),
  ],
  controllers: [EmployeeConsentController],
  providers: [EmployeeConsentService],
})
export class EmployeeConsentModule {}
