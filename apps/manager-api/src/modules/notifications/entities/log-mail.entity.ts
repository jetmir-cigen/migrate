import { CustomerEntity } from '@skytech/manager/modules/customer/entities/customer.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'control.log_mail' })
export class LogMailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'sendtdate' })
  sent: Date;

  @Index()
  @Column({ name: 'customer_id' })
  customerId: number;

  @ManyToOne(() => CustomerEntity, (customer) => customer.logMails)
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;

  @Column({ nullable: true })
  code: string;

  @Column({ nullable: true, name: 'cost_object_id' })
  costObjectId: number;

  @Column({ nullable: true, name: 'mail_recipient' })
  mailRecipient: string;

  @Column({ nullable: true, name: 'mail_type' })
  mailType: string;

  @Column({ nullable: true, name: 'result_message' })
  resultMessage: string;

  @Column()
  result: number;

  @Column({ nullable: true })
  subject: string;

  @Column({ nullable: true })
  body: string;
}
