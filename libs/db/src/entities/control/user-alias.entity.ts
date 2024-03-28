import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CustomerEntity } from './customer.entity';
import { UserEntity } from './user.entity';

@Entity('control.user_alias')
export class UserAliasEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', type: 'int', nullable: true })
  userId: number;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'customer_id', type: 'int', nullable: true })
  customerId: number;

  @ManyToOne(() => CustomerEntity, { nullable: true })
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;

  @Column({ name: 'alias', type: 'varchar', length: 15, nullable: true })
  alias: string;
}
