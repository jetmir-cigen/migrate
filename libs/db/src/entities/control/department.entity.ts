import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  ManyToOne,
  JoinColumn,
  Index,
  OneToMany,
} from 'typeorm';

import { CustomerEntity } from './customer.entity';
import { UserEntity } from './user.entity';
import { CostObjectEntity } from './cost-object.entity';
import { SubscriptionServiceOrderActivationEntity } from './subscription-service-order-activation.entity';

@Entity({ schema: 'control', name: 'control.department' })
@Unique(['customer', 'code'])
export class DepartmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CustomerEntity, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'customer_id' })
  @Index(['customer'])
  customer: CustomerEntity;

  @Column({ name: 'customer_id' })
  customerId: number;

  @Column()
  code: string;

  @Column()
  @Index(['name'])
  name: string;

  @Column({ nullable: true })
  project: string;

  @ManyToOne(() => UserEntity, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  @Index(['user'])
  user: UserEntity;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => UserEntity, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'deputy_user_id' })
  @Index(['deputyUser'])
  deputyUser: UserEntity;

  @Column({ name: 'deputy_user_id' })
  deputyUserId: number;

  @Column({
    type: 'bit',
    width: 1,
    default: () => "b'0'",
    transformer: {
      from: (value: Buffer) => value[0] === 1,
      to: (value: boolean) => (value ? Buffer.from([1]) : Buffer.from([0])),
    },
  })
  inactive: boolean;

  @Column({
    type: 'bit',
    width: 1,
    default: () => "b'0'",
    transformer: {
      from: (value: Buffer) => value[0] === 1,
      to: (value: boolean) => (value ? Buffer.from([1]) : Buffer.from([0])),
    },
    name: 'deputy_mail',
  })
  deputyMail: boolean;

  @Column({ nullable: true, name: 'department_billing_ref' })
  departmentBillingRef: string;

  @OneToMany(() => CostObjectEntity, (co) => co.department)
  costObjects: CostObjectEntity[];

  @OneToMany(
    () => SubscriptionServiceOrderActivationEntity,
    (subscriptionServiceOrderActivation) =>
      subscriptionServiceOrderActivation.department,
  )
  subscriptionServiceOrderActivations: SubscriptionServiceOrderActivationEntity[];
}
