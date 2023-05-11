import { CustomerHeadEntity } from '@/common/entities/customer-head.entity';
import { CustomerEntity } from '@/modules/customer/entities/customer.entity';
import { UserEntity } from '@/modules/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('employee_consent')
export class EmployeeConsentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => CustomerHeadEntity, (customerHead) => customerHead.id, {
    nullable: true,
  })
  @JoinColumn({ name: 'customer_head_id' })
  customerHead: CustomerHeadEntity;

  @OneToOne(() => CustomerEntity, (customer) => customer.id, { nullable: true })
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;

  @Column({ type: 'text', nullable: true })
  text: string;

  @OneToOne(() => UserEntity, (user) => user.id, { nullable: true })
  @JoinColumn({ name: 'created_user_id' })
  user: UserEntity;

  @CreateDateColumn({ name: 'createdDate' })
  createdDate: Date;
}
