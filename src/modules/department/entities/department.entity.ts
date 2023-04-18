import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';

import { Customer } from '@/modules/customer/entities/customer.entity';
import { User } from '@/modules/user/entities/user.entity';

@Entity()
@Unique(['customer', 'code'])
@Index(['customer'])
@Index(['name'])
@Index(['user'])
@Index(['deputyUser'])
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  project: string;

  @ManyToOne(() => User, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => User, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'deputy_user_id' })
  deputyUser: User;

  @Column({ default: false })
  inactive: boolean;

  @Column({ default: false, name: 'deputy_mail' })
  deputyMail: boolean;

  @Column({ nullable: true, name: 'department_billing_ref' })
  departmentBillingRef: string;
}
