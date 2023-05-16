import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { EmployeeConsentEntity } from './entities/employee-consent.entity';
import { Repository } from 'typeorm';

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
        'e.employeeConsentCostObjectsCount',
        'e.employeeConsentCostObjects',
        'employeeConsentCostObjectsCount',
      )
      .groupBy('e.id')
      .orderBy('e.id', 'DESC')
      .getMany();

    return employeeConsents;
  }
}
