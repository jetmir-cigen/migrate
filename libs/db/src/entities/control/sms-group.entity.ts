import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CustomerEntity } from './customer.entity';
import { UserEntity } from './user.entity';

@Entity({ schema: 'control', name: 'control.sms_group' })
export class SmsGroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'customer_id' })
  customerId: number;

  @ManyToOne(() => CustomerEntity)
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;

  @Column()
  name: string;
}
