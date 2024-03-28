import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CustomerEntity } from './customer.entity';
import { CustomerHeadEntity } from './customer-head.entity';
import { EmployeeConsentCostObjectEntity } from './employee-consent-cost-object.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'control.employee_consent' })
export class EmployeeConsentEntity {
  @PrimaryGeneratedColumn() id: number;

  @ManyToOne(() => CustomerHeadEntity, { nullable: true })
  @JoinColumn({ name: 'customer_head_id' })
  customerHead: CustomerHeadEntity;

  @ManyToOne(() => CustomerEntity, { nullable: true })
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;

  @Column({ type: 'text', name: 'text', charset: 'utf8mb4' }) text: string;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'created_user_id' })
  user: UserEntity;

  @Column({ name: 'created_date' }) createdDate: Date;

  @OneToMany(
    () => EmployeeConsentCostObjectEntity,
    (ecco) => ecco.employeeConsent,
  )
  employeeConsentCostObjects: EmployeeConsentCostObjectEntity[];

  public consentsGiven: number;
}
