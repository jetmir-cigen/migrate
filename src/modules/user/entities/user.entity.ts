import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
  Index,
  OneToMany,
} from 'typeorm';
import { CustomerEntity } from '@/modules/customer/entities/customer.entity';
import { UserGroupEntity } from './user-group.entity';
import { EmployeeConsentCostObjectEntity } from '@/modules/employee-consent/entities/employee-consent-cost-object.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'usergroup_id' })
  userGroupId: number;

  @Column({ name: 'customer_id' })
  customerId: number;

  @ManyToOne(() => UserGroupEntity, (usergroup) => usergroup.users, {
    nullable: true,
  })
  @JoinColumn({ name: 'usergroup_id' })
  userGroup: UserGroupEntity;

  @ManyToOne(() => CustomerEntity)
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;

  @Column()
  @Unique(['username'])
  username: string;

  @Column()
  password: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'is_password_change_required' })
  isPasswordChangeRequired: boolean;

  @Column()
  email: string;

  @Column({ nullable: true, name: 'phone_number' })
  @Index(['phoneNumber'])
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

  @OneToMany(
    () => EmployeeConsentCostObjectEntity,
    (ecco) => ecco.employeeConsent,
  )
  employeeConsentCostObjects: EmployeeConsentCostObjectEntity[];
}
