import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeConsentEntity } from './entities/employee-consent.entity';
import { Repository } from 'typeorm';
import { EmployeeConsentDto } from './dto/employee-consent-response.dto';

@Injectable()
export class EmployeeConsentService {
  constructor(
    @InjectRepository(EmployeeConsentEntity)
    private readonly employeeConsentRepository: Repository<EmployeeConsentEntity>,
  ) {}

  async findAll({
    customerId,
    customerHeadId,
  }: {
    customerId: number;
    customerHeadId: number;
  }): Promise<EmployeeConsentDto[]> {
    const employeeConsents = await this.employeeConsentRepository
      .createQueryBuilder('employeeConsent')
      .select('employeeConsent.id', 'id')
      .addSelect('employeeConsent.customer_head_id IS NULL', 'isGlobal')
      .addSelect('employeeConsent.text', 'text')
      .addSelect('employeeConsent.created_date', 'createdDate')
      .addSelect('user.id', 'createdUserId')
      .addSelect(
        "CONCAT(user.first_name, ' ', user.last_name)",
        'createdUserName',
      )
      .addSelect(
        'COUNT(DISTINCT employeeConsentCostObjects.cost_object_id)',
        'consentsGiven',
      )
      .leftJoin('employeeConsent.user', 'user')
      .leftJoin(
        'employeeConsent.employeeConsentCostObjects',
        'employeeConsentCostObjects',
      )
      .where(
        'employeeConsent.customerId = :customerId OR employeeConsent.customerHeadId = :customerHeadId',
        { customerId, customerHeadId },
      )
      .groupBy('employeeConsent.id')
      .orderBy('employeeConsent.id', 'DESC')
      .getRawMany();

    return employeeConsents;
  }
}
