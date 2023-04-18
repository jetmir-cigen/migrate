import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
  Index,
} from 'typeorm';
// import { Usergroup } from './usergroup.entity';
import { Customer } from '@/modules/customer/entities/customer.entity';
// import { InvoiceAccount } from './invoice-account.entity';

@Entity()
@Unique(['username'])
@Index(['phoneNumber'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'usergroup_id' })
  usergroupId: number;

  // @ManyToOne(() => Usergroup)
  // @JoinColumn({ name: 'usergroup_id' })
  // usergroup: Usergroup;

  @Column({ nullable: true, name: 'customer_id' })
  customerId: number;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  email: string;

  @Column({ nullable: true, name: 'phone_number' })
  phoneNumber: string;

  @Column({ nullable: true, name: 'reset_token' })
  resetToken: string;

  @Column({ nullable: true, name: 'reset_timeout' })
  resetTimeout: Date;

  @Column({ nullable: true, name: 'invoice_account_id' })
  invoiceAccountId: number;

  // @ManyToOne(() => InvoiceAccount)
  // @JoinColumn({ name: 'invoice_account_id' })
  // invoiceAccount: InvoiceAccount;

  @Column({ default: false })
  seller: boolean;

  @Column({ default: false })
  salesboss: boolean;

  @Column({ default: 47, name: 'country_id' })
  countryId: number;

  @Column({ nullable: true })
  locale: string;

  @Column({ default: false })
  inactive: boolean;

  @Column({ nullable: true, name: 'email_cc' })
  emailCc: string;

  @Column({ nullable: true, name: 'email_bcc' })
  emailBcc: string;

  @Column({ nullable: true, name: 'adminsecretcode' })
  adminSecretCode: string;

  @Column({ default: false, name: 'has_frame_agreement_access' })
  hasFrameAgreementAccess: boolean;
}
