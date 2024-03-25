import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { TelePolicyTemplateEntity } from './tele-policy-template.entity';
import { CustomerEntity } from './customer.entity';
import { CustomerHeadEntity } from './customer-head.entity';
import { CostObjectEntity } from './cost-object.entity';
import { SubscriptionServiceOrderActivationEntity } from './subscription-service-order-activation.entity';

@Entity({ schema: 'control', name: 'control.salary_deduction_profile' })
export class SalaryDeductionProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', length: 100 })
  name: string;

  @Column({ name: 'customer_id' })
  customerId: number;

  @ManyToOne(() => CustomerEntity)
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;

  @Column({ name: 'customer_head_id' })
  customerHeadId: number;

  @ManyToOne(() => CustomerHeadEntity)
  @JoinColumn({ name: 'customer_head_id' })
  customerHead: CustomerHeadEntity;

  @Column({
    name: 'free_allowance_amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
  })
  freeAllowanceAmount: number;

  @Column({ name: 'comment', type: 'text', nullable: true })
  comment: string;

  @Column({ name: 'tele_policy_template_id' })
  telePolicyTemplateId: number;

  @ManyToOne(() => TelePolicyTemplateEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'tele_policy_template_id' })
  telePolicyTemplate: TelePolicyTemplateEntity;

  @OneToMany(() => CostObjectEntity, (co) => co.salaryDeductionProfile)
  costObjects: CostObjectEntity[];
  public subscribers: number;

  @OneToMany(
    () => SubscriptionServiceOrderActivationEntity,
    (subscriptionServiceOrderActivation) =>
      subscriptionServiceOrderActivation.salaryDeductionProfile,
  )
  subscriptionServiceOrderActivations: SubscriptionServiceOrderActivationEntity[];
}
