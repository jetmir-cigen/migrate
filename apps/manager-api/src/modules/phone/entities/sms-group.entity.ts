import { CustomerEntity } from '@/modules/customer/entities/customer.entity';
import { UserEntity } from '@/modules/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

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
