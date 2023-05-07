import { Module } from '@nestjs/common';
import { EmployeeConsentService } from './employee-consent.service';
import { EmployeeConsentController } from './employee-consent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeConsentEntity } from './entities/employee-consent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeConsentEntity])],
  controllers: [EmployeeConsentController],
  providers: [EmployeeConsentService],
})
export class EmployeeConsentModule {}
