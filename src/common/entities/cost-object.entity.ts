import { EmployeeConsentCostObjectEntity } from '@/modules/employee-consent/entities/employee-consent-cost-object.entity';
import { SalaryDeductionProfileEntity } from '@/modules/tele-policy/entities/salary-deduction-profile.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'cost_object', schema: 'control' })
export class CostObjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'app_message',
    type: 'text',
  })
  appMessage: string;

  @Column({
    name: 'code',
    type: 'varchar',
    length: 45,
    unique: true,
  })
  code: string;

  @Column({
    name: 'country_id',
    type: 'int',
    default: 47,
  })
  countryId: number;

  @Column({
    name: 'status',
    type: 'char',
    length: 1,
    default: 'A',
  })
  status: string;

  @Column({
    name: 'customer_id',
    type: 'int',
    nullable: true,
  })
  customerId: number;

  @Column({
    name: 'type',
    type: 'char',
    length: 1,
    nullable: true,
    comment:
      'Type could be M=Mobile, D=Data, P=Phone, S=System user or C=Customer',
  })
  type: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
  })
  name: string;

  @Column({
    name: 'locale',
    type: 'varchar',
    length: 2,
  })
  locale: string;

  @Column({
    name: 'department_id',
    type: 'int',
  })
  departmentId: number;

  @Column({
    name: 'employee_no',
    type: 'varchar',
    length: 45,
  })
  employeeNo: string;

  @Column({
    name: 'invoice_info',
    type: 'varchar',
    length: 255,
  })
  invoiceInfo: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 100,
  })
  email: string;

  @Column({
    name: 'benefit_mobile',
    type: 'char',
    length: 1,
    default: 'N',
    comment: 'Type of fringe benefit mobile. N=No, F=Free, W=Work, C=Ceiling',
  })
  benefitMobile: string;

  @Column({
    name: 'benefit_mobile_ceiling',
    type: 'decimal',
    scale: 2,
  })
  benefitMobileCeiling: number;

  @Column({
    name: 'benefit_phone',
    type: 'bit',
    nullable: true,
    default: 0,
  })
  benefitPhone: boolean;

  @Column({
    name: 'benefit_data',
    type: 'bit',
    nullable: true,
    default: 0,
  })
  benefitData: boolean;

  @Column({
    name: 'has_admin_cost',
    type: 'bit',
    nullable: true,
    default: 1,
  })
  hasAdminCost: boolean;

  @Column({
    name: 'contract_date',
    type: 'date',
  })
  contractDate: Date;

  @Column({
    name: 'termination_fee',
    type: 'decimal',
    scale: 2,
  })
  terminationFee: number;

  @Column({
    name: 'termination_fee_type',
    type: 'char',
    length: 1,
    default: 'M',
    comment:
      'The termination fee could be computed as a F=Fixed value, or M=Monthly value',
  })
  terminationFeeType: string;

  @Column({
    name: 'note',
    type: 'text',
  })
  note: string;

  @Column({
    name: 'connection_number',
    type: 'varchar',
    length: 45,
  })
  connectionNumber: string;

  @Column({
    name: 'connection_speed',
    type: 'int',
  })
  connectionSpeed: number;

  @Column({
    name: 'accounting_code',
    type: 'varchar',
    length: 55,
  })
  accountingCode: string;

  @Column({
    name: 'vendor_product_id',
    type: 'int',
  })
  vendorProductId: number;

  @Column({
    name: 'start_date',
    type: 'date',
  })
  startDate: Date;

  @Column({
    name: 'end_date',
    type: 'date',
  })
  endDate: Date;

  @Column({
    name: 'cost_price',
    type: 'decimal',
    scale: 2,
  })
  costPrice: number;

  @Column({
    name: 'invoice_price',
    type: 'decimal',
    scale: 2,
  })
  invoicePrice: number;

  @Column({
    name: 'benefit_phone_start',
    type: 'date',
  })
  benefitPhoneStart: Date;

  @Column({
    name: 'benefit_phone_end',
    type: 'date',
  })
  benefitPhoneEnd: Date;

  @Column({
    name: 'benefit_phone_amount',
    type: 'decimal',
    scale: 2,
  })
  benefitPhoneAmount: number;

  @Column({
    name: 'benefit_data_start',
    type: 'date',
  })
  benefitDataStart: Date;

  @Column({
    name: 'benefit_data_end',
    type: 'date',
  })
  benefitDataEnd: Date;

  @Column({
    name: 'benefit_data_amount',
    type: 'decimal',
    scale: 2,
  })
  benefitDataAmount: number;

  @Column({
    name: 'fixed_salary_deduction_amount',
    type: 'decimal',
    scale: 2,
    precision: 8,
    nullable: true,
    default: '0.00',
  })
  fixedSalaryDeductionAmount: number;

  @Column({
    name: 'fixed_salary_deduction_comment',
    type: 'text',
  })
  fixedSalaryDeductionComment: string;

  @Column({
    name: 'parent_cost_object_id',
    type: 'int',
  })
  parentCostObjectId: number;

  @Column({
    name: 'all_cost_responsible',
    type: 'int',
    nullable: true,
    default: 0,
  })
  allCostResponsible: number;

  @Column({
    name: 'salary_deduction_minimum_amount',
    type: 'decimal',
    scale: 2,
    precision: 8,
    nullable: true,
    default: '0.00',
  })
  salaryDeductionMinimumAmount: number;

  @ManyToOne(() => SalaryDeductionProfileEntity)
  @JoinColumn({ name: 'salary_deduction_profile_id' })
  salaryDeductionProfile: SalaryDeductionProfileEntity;

  @Column({
    name: 'salary_deduction_profile_id',
    type: 'int',
  })
  salaryDeductionProfileId: number;

  @Column({
    name: 'mobile_user',
    type: 'bit',
    nullable: true,
    default: 1,
  })
  mobileUser: boolean;

  @Column({
    name: 'customer_head_admin_id',
    type: 'int',
  })
  customerHeadAdminId: number;

  @Column({
    name: 'dim_1',
    type: 'varchar',
    length: 255,
  })
  dim1: string;

  @Column({
    name: 'dim_2',
    type: 'varchar',
    length: 255,
  })
  dim2: string;

  @Column({
    name: 'dim_3',
    type: 'varchar',
    length: 255,
  })
  dim3: string;

  @Column({
    name: 'dim_4',
    type: 'varchar',
    length: 255,
  })
  dim4: string;

  @Column({
    name: 'mass_message_recipient',
    type: 'bit',
    nullable: true,
    default: 1,
  })
  massMessageRecipient: boolean;

  @Column({
    name: 'device_policy_id',
    type: 'int',
  })
  devicePolicyId: number;

  @Column({
    name: 'created',
    type: 'datetime',
  })
  created: Date;

  @Column({
    name: 'last_update',
    type: 'datetime',
  })
  lastUpdate: Date;

  @Column({
    name: 'last_invoice',
    type: 'date',
  })
  lastInvoice: Date;

  @Column({
    name: 'hidden',
    type: 'tinyint',
    nullable: true,
    default: 0,
  })
  hidden: number;

  @Column({
    name: 'ad_username',
    type: 'varchar',
    length: 255,
  })
  adUsername: string;

  @Column({
    name: 'created_user_id',
    type: 'int',
  })
  createdUserId: number;

  @Column({
    name: 'edited_user_id',
    type: 'int',
  })
  editedUserId: number;

  @Column({
    name: 'carrier_api_subscription_id',
    type: 'varchar',
    length: 100,
  })
  carrierApiSubscriptionId: string;

  @Column({
    name: 'carrier_api_billingaccount',
    type: 'varchar',
    length: 100,
  })
  carrierApiBillingaccount: string;

  @Column({
    name: 'carrier_api_subscription_product_code',
    type: 'varchar',
    length: 100,
  })
  carrierApiSubscriptionProductCode: string;

  @OneToMany(
    () => EmployeeConsentCostObjectEntity,
    (ecco) => ecco.employeeConsent,
  )
  employeeConsentCostObjects: EmployeeConsentCostObjectEntity[];
}
