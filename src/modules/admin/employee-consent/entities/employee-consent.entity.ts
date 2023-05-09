import { CustomerHeadEntity } from '@/modules/customer-head/entities/customer-head.entity';
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

@Entity('employee-consent')
export class EmployeeConsentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => CustomerHeadEntity, (customerHead) => customerHead.id, {
    nullable: true,
  })
  customerHeadId: string;

  @OneToOne(() => CustomerEntity, (customer) => customer.id, { nullable: true })
  customerId: number;

  @Column({ type: 'text', nullable: true })
  text: string;

  @OneToOne(() => UserEntity, (user) => user.id, { nullable: true })
  @JoinColumn({ name: 'createdUserId' })
  user: UserEntity;

  @Column({ name: 'created_user_id' })
  createdUserId: number;

  @CreateDateColumn({ name: 'createdDate' })
  createdDate: Date;
}
