import { CostObjectEntity } from '@/common/entities/cost-object.entity';
import { CountryEntity } from '@/common/entities/country.entity';
import { LogMailEntity } from '@/modules/notifications/entities/log-mail.entity';
import { LogSmsPushEntity } from '@/modules/phone/entities/log-sms-push.entity';
import { SubscriptionServicesEntity } from '@/modules/subscriptions/entities/subscription-services.entity';
import { UserEntity } from '@/modules/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  Index,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'control.customer' })
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'customer_no', type: 'char', length: 40, nullable: false })
  @Unique(['customer_no'])
  customerNo: string;

  @Column({ name: 'org_no', type: 'char', length: 20, nullable: false })
  @Unique(['org_no'])
  orgNo: string;

  @Column({ name: 'vat_no', type: 'char', length: 20, nullable: true })
  vatNo: string;

  @Column({ name: 'name', type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ name: 'refactoring', type: 'boolean', default: false })
  refactoring: boolean;

  @Column({ name: 'address1', type: 'varchar', length: 45, nullable: true })
  address1: string;

  @Column({ name: 'address2', type: 'varchar', length: 45, nullable: true })
  address2: string;

  @Column({
    name: 'zip',
    type: 'varchar',
    length: 10,
    nullable: false,
    default: '0001',
  })
  zip: string;

  @Column({
    name: 'city',
    type: 'varchar',
    length: 45,
    nullable: false,
    default: 'IKKE SATT',
  })
  city: string;

  @Column({
    name: 'billing_address1',
    type: 'varchar',
    length: 45,
    nullable: true,
  })
  billingAddress1: string;

  @Column({
    name: 'billing_address2',
    type: 'varchar',
    length: 45,
    nullable: true,
  })
  billingAddress2: string;

  @Column({ name: 'billing_zip', type: 'varchar', length: 10, nullable: true })
  billingZip: string;

  @Column({ name: 'billing_city', type: 'varchar', length: 45, nullable: true })
  billingCity: string;

  @Column({ name: 'customer_status', type: 'int', default: 0 })
  customerStatus: number;

  @Column({
    name: 'use_alt_pdf_front',
    type: 'int',
    nullable: false,
    default: 0,
  })
  useAltPdfFront: number;

  @Column({ name: 'recieve_mail', type: 'int', nullable: false, default: 0 })
  receiveMail: number;

  @Column({
    name: 'mail_template',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  mailTemplate: string;

  @Column({
    name: 'mail_color_scheme',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  mailColorScheme: string;

  @Column({ name: 'customer_head_id', type: 'int', nullable: true })
  @Index(['customer_head_id'])
  customerHeadId: number;

  @Column({
    name: 'admin_cost_per_cost_object',
    type: 'boolean',
    default: false,
  })
  adminCostPerCostObject: boolean;

  @Column({
    name: 'mail_template_department',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  mailTemplateDepartment: string;

  @Column({ name: 'comment', type: 'text', nullable: true })
  comment: string;

  @Column({
    name: 'invoice_quantity',
    type: 'int',
    nullable: false,
    default: 0,
  })
  invoiceQuantity: number;

  @Column({
    name: 'invoice_cost',
    type: 'decimal',
    precision: 8,
    scale: 2,
    nullable: false,
    default: 0.0,
  })
  invoiceCost: number;

  @Column({
    name: 'init_arpu',
    type: 'decimal',
    precision: 8,
    scale: 2,
    nullable: false,
    default: 0.0,
  })
  initArpu: number;

  @Column({
    name: 'init_uarpu',
    type: 'decimal',
    precision: 8,
    scale: 2,
    nullable: false,
    default: 0.0,
  })
  initUarpu: number;

  @Column({
    name: 'init_barpu',
    type: 'decimal',
    precision: 8,
    scale: 2,
    nullable: false,
    default: 0.0,
  })
  initBarpu: number;

  @Column({ name: 'country_id', type: 'int', default: 47 })
  @Index(['countryId'])
  countryId: number;

  @ManyToOne(() => CountryEntity)
  @JoinColumn({ name: 'country_id' })
  country: CountryEntity;

  @Column({ name: 'locale', type: 'varchar', length: 2, nullable: true })
  locale?: string;

  @Column({ name: 'whitelabel_id', type: 'int', default: 1 })
  @Index(['whitelabelId'])
  whitelabelId: number;

  @Column({
    name: 'department_mail_send_date',
    type: 'smallint',
    nullable: true,
  })
  departmentMailSendDate?: number;

  @Column({
    name: 'tci_index_percentage',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 25,
  })
  tciIndexPercentage: number;

  @Column({
    name: 'salary_deduct_app_mail_template',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  salaryDeductAppMailTemplate?: string;

  @Column({
    name: 'customer_custom_url_param',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  customerCustomUrlParam?: string;

  @Column({
    name: 'mail_template_admin',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  mailTemplateAdmin?: string;

  @Column({
    name: 'mail_template_user_reminder',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  mailTemplateUserReminder?: string;

  @Column({ name: 'dealer_user_id', type: 'int', nullable: true })
  dealerUserId?: number;

  @Column({ name: 'device_dealer_user_id', type: 'int', nullable: true })
  deviceDealerUserId?: number;

  @Column({ name: 'device_policy_message', type: 'text', nullable: true })
  devicePolicyMessage?: string;

  @CreateDateColumn({ name: 'created' })
  created: Date;

  @UpdateDateColumn({ name: 'last_update' })
  lastUpdate: Date;

  @Column({ name: 'billing_cycle_months', type: 'int', default: 1 })
  billingCycleMonths: number;

  @Column({ name: 'device_policy_vendor_id', type: 'int', default: 1 })
  @Index(['devicePolicyVendorId'])
  devicePolicyVendorId: number;

  @Column({ name: 'number_of_employees', type: 'int', nullable: true })
  numberOfEmployees?: number;

  @Column({
    name: 'internal_company_identifier',
    type: 'varchar',
    length: 45,
    nullable: true,
  })
  internalCompanyIdentifier?: string;

  @OneToMany(() => LogSmsPushEntity, (logSmsPush) => logSmsPush.customer)
  logSmsPushes: LogSmsPushEntity[];

  @OneToMany(() => UserEntity, (user) => user.customer)
  users: UserEntity[];

  @OneToMany(() => CostObjectEntity, (c) => c.customer)
  costObjects: CostObjectEntity[];

  @OneToMany(() => LogMailEntity, (logMail) => logMail.customer)
  logMails: LogMailEntity[];

  @OneToMany(
    () => SubscriptionServicesEntity,
    (subscriptionServices) => subscriptionServices.customer,
  )
  subscriptionServices: SubscriptionServicesEntity[];
}
