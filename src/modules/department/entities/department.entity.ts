import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';

import { CustomerEntity } from '@/modules/customer/entities/customer.entity';
import { UserEntity } from '@/modules/user/entities/user.entity';

@Entity({ schema: 'control', name: 'department' })
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

  @Column({ default: false })
  inactive: boolean;

  @Column({ default: false, name: 'deputy_mail' })
  deputyMail: boolean;

  @Column({ nullable: true, name: 'department_billing_ref' })
  departmentBillingRef: string;
}
