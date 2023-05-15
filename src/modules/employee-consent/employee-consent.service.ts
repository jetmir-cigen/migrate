import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { EmployeeConsentEntity } from './entities/employee-consent.entity';
import { Repository } from 'typeorm';
import { EmployeeConsentDto } from './dto/employee-consent-response.dto';
import { CreateEmployeeConsentDto } from './dto/create-employee-consent.dto';

@Injectable()
export class EmployeeConsentService {
  constructor(
    @InjectRepository(EmployeeConsentEntity)
    @InjectDataSource()
    private readonly employeeConsentRepository: Repository<EmployeeConsentEntity>,
  ) {}

  async findAll({
    customer,
    customerHead,
  }: {
    customer: { id: number };
    customerHead: { id: number };
  }): Promise<EmployeeConsentDto[]> {
    const employeeConsents = await this.employeeConsentRepository
      .createQueryBuilder('employee_consent')
      .select('employee_consent.id', 'id')
      .addSelect('employee_consent.customer_head_id', 'customerHeadId')
      .addSelect('employee_consent.text', 'text')
      .addSelect('employee_consent.created_date', 'createdDate')
      .addSelect('user.id', 'createdUserId')
      .addSelect('user.first_name', 'createdUserFirstName')
      .addSelect('user.last_name', 'createdUserLastName')
      .addSelect(
        'COUNT(employeeConsentCostObjects.employee_consent_id)',
        'consentsGiven',
      )
      .leftJoin('employee_consent.user', 'user')
      .leftJoin(
        'employee_consent.employeeConsentCostObjects',
        'employeeConsentCostObjects',
      )
      .where(
        'employee_consent.customer_id = :customerId OR employee_consent.customer_head_id = :customerHeadId',
        { customerId: customer.id, customerHeadId: customerHead.id },
      )
      .groupBy('employee_consent.id')
      .orderBy('employee_consent.id', 'DESC')
      .getRawMany();

    return employeeConsents;
  }

  async create({
    createDepartmentDto,
    user,
    customer,
    customerHead,
  }: {
    createDepartmentDto: CreateEmployeeConsentDto;
    customer: { id: number };
    customerHead: { id: number };
    user: { id: number };
  }): Promise<EmployeeConsentEntity> {
    try {
      const employeeConsent = await this.employeeConsentRepository.save({
        ...createDepartmentDto,
        createdUserId: user.id,
        customerId: customer.id,
        customerHeadId: createDepartmentDto.isGlobal ? customerHead.id : null,
      });

      return this.employeeConsentRepository.findOneOrFail({
        where: { id: employeeConsent.id },
      });
    } catch (err) {
      throw err;
    }
  }
}
