import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { CostObjectEntity } from './cost-object.entity';
import { CustomerEntity } from './customer.entity';
import { EmployeeConsentCostObjectEntity } from './employee-consent-cost-object.entity';
import { LogSmsPushEntity } from './log-sms-push.entity';
import { SubscriptionServiceOrdersEntity } from './subscription-service-orders.entity';
import { TextTemplateEntity } from './text-template.entity';
import { UserGroupEntity } from './user-group.entity';

@Entity('control.user')
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

  @ManyToOne(() => CustomerEntity, (customer) => customer.users)
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

  @OneToMany(() => LogSmsPushEntity, (logSmsPush) => logSmsPush.user)
  logSmsPushes: LogSmsPushEntity[];

  @OneToOne(() => CostObjectEntity)
  @JoinColumn({ name: 'phone_number' })
  costObject: CostObjectEntity;

  @OneToMany(
    () => EmployeeConsentCostObjectEntity,
    (ecco) => ecco.employeeConsent,
  )
  employeeConsentCostObjects: EmployeeConsentCostObjectEntity[];

  textTemplate: TextTemplateEntity;

  @OneToMany(
    () => SubscriptionServiceOrdersEntity,
    (subscriptionServiceOrders) => subscriptionServiceOrders.createdUser,
  )
  subscriptionServiceOrders: SubscriptionServiceOrdersEntity[];

  @OneToMany(
    () => SubscriptionServiceOrdersEntity,
    (subscriptionServiceOrders) => subscriptionServiceOrders.updatedUser,
  )
  subscriptionServiceOrders2: SubscriptionServiceOrdersEntity[];
}
