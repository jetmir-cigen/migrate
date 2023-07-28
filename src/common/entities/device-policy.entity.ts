import { CustomerEntity } from '@/modules/customer/entities/customer.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CustomerHeadEntity } from './customer-head.entity';
import { UserEntity } from '@/modules/user/entities/user.entity';

@Entity({ name: 'control.device_policy' })
export class DevicePolicyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'customer_id' })
  customerId: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: 'covered_amount' })
  coveredAmount: number;

  @Column({ name: 'cover_interval' })
  coverInterval: number;

  @Column({ name: 'minimum_amount' })
  minimumAmount: number;

  @Column({ name: 'order_interval' })
  orderInterval: number;

  @Column({ name: 'payment_interval' })
  paymentInterval: number;

  @Column({ name: 'manager_approval_needed' })
  managerApprovalNeeded: boolean;

  @Column({ name: 'customer_head_id' })
  customerHeadId: number;

  @Column()
  vat: boolean;

  @Column({ name: 'is_custom_address_activated' })
  isCustomAddressActivated: boolean;

  @Column({ name: 'auto_add_new_products' })
  autoAddNewProducts: boolean;

  @Column({ name: 'admin_user_id' })
  adminUserId: number;

  @Column()
  isActive: boolean;

  @ManyToOne((type) => CustomerEntity)
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;

  @ManyToOne((type) => CustomerHeadEntity)
  @JoinColumn({ name: 'customer_head_id' })
  customerHead: CustomerHeadEntity;

  @ManyToOne((type) => UserEntity)
  @JoinColumn({ name: 'admin_user_id' })
  adminUser: UserEntity;
}
