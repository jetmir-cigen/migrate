import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CustomerEntity } from './customer.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'control.log_sms_push' })
export class LogSmsPushEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime' })
  sent: Date;

  @Column({ type: 'varchar', length: 500 })
  @Index()
  message: string;

  @Column({ type: 'varchar', length: 255 })
  @Index()
  response: string;

  @Column({ type: 'varchar', length: 20, nullable: true, name: 'reciever' })
  @Index()
  receiver: string | null;

  @Column({ type: 'varchar', length: 32 })
  sender: string;

  @Column({ type: 'int', nullable: true, name: 'customer_id' })
  customerId: number | null;

  @ManyToOne(() => CustomerEntity, (customer) => customer.logSmsPushes)
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;

  @Column({ type: 'varchar', length: 255, default: 'PASSWORD' })
  type: string;

  @Column({ type: 'varchar', length: 4, default: '47' })
  land: string;

  @Column({ type: 'int', nullable: true, name: 'device_policy_order_id' })
  devicePolicyOrderId: number | null;

  @Column({ type: 'int', nullable: true, name: 'subscription_order_id' })
  subscriptionOrderId: number | null;

  @Column({ type: 'int', nullable: true, name: 'ecom_order_id' })
  ecomOrderId: number | null;

  @Column({ type: 'int', nullable: true, name: 'user_id' })
  userId: number | null;

  @ManyToOne(() => UserEntity, (user) => user.logSmsPushes)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ type: 'tinyint', nullable: false, name: 'is_private' })
  isPrivate: number | null;

  @Column({ type: 'varchar', length: 255, name: 'batch_id', nullable: true })
  batchId: string;

  // @OneToMany(() => LogSmsPushEntity, (lsp) => lsp.receiver)
  // smslogs: LogSmsPushEntity[];
  // public receivers: number;

  @Column({
    select: false,
    insert: false,
    update: false,
    type: 'int',
  })
  receivers: number;
}
