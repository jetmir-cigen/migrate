import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { CustomerHeadEntity } from '@/common/entities/customer-head.entity';
import { CustomerEntity } from '@/modules/customer/entities/customer.entity';
import { UserEntity } from '@/modules/user/entities/user.entity';
import { EmployeeConsentCostObjectEntity } from './employee-consent-cost-object.entity';

@Entity({ name: 'employee_consent' })
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
