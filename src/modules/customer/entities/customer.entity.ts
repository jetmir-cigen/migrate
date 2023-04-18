import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  Index,
} from 'typeorm';

@Entity()
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 40, nullable: false })
  @Unique(['customer_no'])
  customer_no: string;

  @Column({ type: 'char', length: 20, nullable: false })
  @Unique(['org_no'])
  org_no: string;

  @Column({ type: 'char', length: 20, nullable: true })
  vat_no: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'boolean', default: false })
  refactoring: boolean;

  @Column({ type: 'varchar', length: 45, nullable: true })
  address1: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  address2: string;

  @Column({ type: 'varchar', length: 10, nullable: false, default: '0001' })
  zip: string;

  @Column({
    type: 'varchar',
    length: 45,
    nullable: false,
    default: 'IKKE SATT',
  })
  city: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  billing_address1: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  billing_address2: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  billing_zip: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  billing_city: string;

  @Column({ type: 'int', default: 0 })
  customer_status: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  use_alt_pdf_front: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  recieve_mail: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  mail_template: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  mail_color_scheme: string;

  @Column({ type: 'int', nullable: true })
  @Index(['customer_head_id'])
  customer_head_id: number;

  @Column({ type: 'boolean', default: false })
  admin_cost_per_cost_object: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  mail_template_department: string;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @Column({ type: 'int', nullable: false, default: 0 })
  invoice_quantity: number;

  @Column({
    type: 'decimal',
    precision: 8,
    scale: 2,
    nullable: false,
    default: 0.0,
  })
  invoice_cost: number;

  @Column({
    type: 'decimal',
    precision: 8,
    scale: 2,
    nullable: false,
    default: 0.0,
  })
  init_arpu: number;

  @Column({
    type: 'decimal',
    precision: 8,
    scale: 2,
    nullable: false,
    default: 0.0,
  })
  init_uarpu: number;

  @Column({
    type: 'decimal',
    precision: 8,
    scale: 2,
    nullable: false,
    default: 0.0,
  })
  init_barpu: number;

  @Column({ name: 'country_id', type: 'int', default: 47 })
  @Index(['countryId'])
  countryId: number;

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
}
