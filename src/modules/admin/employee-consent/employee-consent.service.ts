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
    customerId,
    customerHeadId,
  }: {
    customerId: number;
    customerHeadId: number;
  }): Promise<EmployeeConsentDto[]> {
    const groupedConsents: {
      employeeConsentId: number;
      consentsGiven: number;
    }[] = await this.employeeConsentRepository.query(
      `SELECT employee_consent_id employeeConsentId, COUNT(employee_consent_id) AS consentsGiven
      FROM employee_consent_cost_object GROUP BY employee_consent_id;
      `,
    );

    const employeeConsents = await this.employeeConsentRepository
      .createQueryBuilder('employee_consent')
      .select('employee_consent.id', 'id')
      .addSelect(
        `IF(employee_consent.customer_head_id IS NULL, 'false', 'true')`,
        'isGlobal',
      )
      .addSelect('employee_consent.text', 'text')
      .addSelect('employee_consent.created_date', 'createdDate')
      .addSelect('user.id', 'createdUserId')
      .addSelect(
        "CONCAT(user.first_name, ' ', user.last_name)",
        'createdUserName',
      )
      .leftJoin('employee_consent.user', 'user')
      .where(
        'employee_consent.customer_id = :customerId OR employee_consent.customer_head_id = :customerHeadId',
        { customerId, customerHeadId },
      )
      .groupBy('employee_consent.id')
      .orderBy('employee_consent.id', 'DESC')
      .getMany();

    const consents = employeeConsents.map((consent) => {
      const consentsGiven =
        groupedConsents.find(
          ({ employeeConsentId }) => employeeConsentId === consent.id,
        )?.consentsGiven || 0;
      return { ...consent, consentsGiven };
    });

    return consents as EmployeeConsentDto;
  }

  async create(
    createDepartmentDto: CreateEmployeeConsentDto,
    customerId: number,
  ): Promise<EmployeeConsentEntity> {
    try {
      const department = await this.employeeConsentRepository.save({});

      return this.employeeConsentRepository.findOneOrFail({
        where: { id: department.id },
        relations: ['user', 'deputyUser'],
      });
    } catch (err) {
      throw err;
    }
  }
}
