import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { EmployeeConsentEntity } from './entities/employee-consent.entity';
import { Repository } from 'typeorm';
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
  }): Promise<EmployeeConsentEntity[]> {
    const employeeConsents = await this.employeeConsentRepository
      .createQueryBuilder('e')
      .leftJoin('e.employeeConsentCostObjects', 'employeeConsentCostObjects')
      .leftJoin('e.user', 'u')
      .leftJoin('e.customerHead', 'ch')
      .leftJoin('e.customer', 'c')
      .select(['e', 'u.id', 'u.firstName', 'u.lastName', 'ch.id', 'c.id'])
      .where(
        'e.customer_id = :customer OR e.customer_head_id = :customerHead',
        { customer: customer.id, customerHead: customerHead.id },
      )
      .loadRelationCountAndMap(
        'e.consentsGiven',
        'e.employeeConsentCostObjects',
        'consentsGiven',
      )
      .groupBy('e.id')
      .orderBy('e.id', 'DESC')
      .getMany();

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
        createdDate: new Date(),
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
