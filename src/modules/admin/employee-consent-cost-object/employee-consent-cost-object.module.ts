import { Module } from '@nestjs/common';
import { EmployeeConsentCostObjectService } from './employee-consent-cost-object';
import { EmployeeConsentCostObjectController } from './employee-consent-cost-object.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeConsentCostObjectEntity } from './entities/employee-consent-cost-object.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeConsentCostObjectEntity])],
  controllers: [EmployeeConsentCostObjectController],
  providers: [EmployeeConsentCostObjectService],
})
export class EmployeeConsentCostObjectModule {}
