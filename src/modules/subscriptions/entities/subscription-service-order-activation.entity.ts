import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { DepartmentEntity } from '@/modules/department/entities/department.entity';
import { DevicePolicyEntity } from '@/common/entities/device-policy.entity';
import { SalaryDeductionProfileEntity } from '@/modules/tele-policy/entities/salary-deduction-profile.entity';
import { SubscriptionServiceOrdersEntity } from './subscription-service-orders.entity';

@Index('id', ['id'], { unique: true })
@Index('code', ['code'], {})
@Index(
  'subscription_service_order_activation_department_id_fk',
  ['departmentId'],
  {},
)
@Index(
  'subscription_service_order_activation_device_policy_id_fk',
  ['devicePolicyId'],
  {},
)
@Index(
  'sub_service_order_activation_salary_deduction_profile_id_fk',
  ['salaryDeductionProfileId'],
  {},
)
@Entity('control.subscription_service_order_activation', { schema: 'control' })
export class SubscriptionServiceOrderActivationEntity {
  @PrimaryColumn('int', { name: 'id' })
  id: number;

  @Column('int', { name: 'department_id', nullable: true })
  departmentId: number | null;

  @Column('varchar', { name: 'name_company', nullable: true, length: 255 })
  nameCompany: string | null;

  @Column('varchar', { name: 'birthdate_org_no', nullable: true, length: 255 })
  birthdateOrgNo: string | null;

  @Column('varchar', { name: 'phone_no', nullable: true, length: 20 })
  phoneNo: string | null;

  @Column('int', {
    name: 'phone_no_country_id',
    nullable: true,
    default: () => "'47'",
  })
  phoneNoCountryId: number | null;

  @Column('int', { name: 'vendor_old', nullable: true })
  vendorOld: number | null;

  @Column('int', { name: 'vendor_new', nullable: true })
  vendorNew: number | null;

  @Column('varchar', { name: 'name_new', length: 255 })
  nameNew: string;

  @Column('varchar', { name: 'id_number', nullable: true, length: 255 })
  idNumber: string | null;

  @Column('varchar', { name: 'personal_id', nullable: true, length: 20 })
  personalId: string | null;

  @Column('varchar', { name: 'sim_number', nullable: true, length: 40 })
  simNumber: string | null;

  @Column('tinyint', { name: 'new_sim', width: 1, default: () => "'0'" })
  newSim: boolean;

  @Column('varchar', { name: 'data_sim_number', nullable: true, length: 40 })
  dataSimNumber: string | null;

  @Column('tinyint', { name: 'new_data_sim', width: 1, default: () => "'0'" })
  newDataSim: boolean;

  @Column('tinyint', { name: 'new_twin_sim', width: 1, default: () => "'0'" })
  newTwinSim: boolean;

  @Column('varchar', { name: 'sim_name', nullable: true, length: 255 })
  simName: string | null;

  @Column('varchar', { name: 'sim_adr', nullable: true, length: 255 })
  simAdr: string | null;

  @Column('varchar', { name: 'sim_zip', nullable: true, length: 10 })
  simZip: string | null;

  @Column('varchar', { name: 'sim_city', nullable: true, length: 255 })
  simCity: string | null;

  @Column('timestamp', { name: 'activation_date', nullable: true })
  activationDate: Date | null;

  @Column('varchar', { name: 'code', length: 255 })
  code: string;

  @Column('tinyint', { name: 'new_number', nullable: true, width: 1 })
  newNumber: boolean | null;

  @Column('varchar', { name: 'type', nullable: true, length: 40 })
  type: string | null;

  @Column('varchar', { name: 'email', nullable: true, length: 100 })
  email: string | null;

  @Column('varchar', { name: 'employee_number', nullable: true, length: 25 })
  employeeNumber: string | null;

  @Column('tinyint', { name: 'business_sub', width: 1, default: () => "'0'" })
  businessSub: boolean;

  @Column('varchar', {
    name: 'authorization_file_mime',
    nullable: true,
    length: 50,
  })
  authorizationFileMime: string | null;

  @Column('blob', { name: 'authorization_file_content', nullable: true })
  authorizationFileContent: Buffer | null;

  @Column('varchar', { name: 'contact_number', nullable: true, length: 25 })
  contactNumber: string | null;

  @Column('int', {
    name: 'contact_number_country_id',
    nullable: true,
    default: () => "'47'",
  })
  contactNumberCountryId: number | null;

  @Column('int', { name: 'document_id', nullable: true })
  documentId: number | null;

  @Column('datetime', { name: 'user_submission', nullable: true })
  userSubmission: Date | null;

  @Column('int', { name: 'device_policy_id', nullable: true })
  devicePolicyId: number | null;

  @Column('int', { name: 'salary_deduction_profile_id', nullable: true })
  salaryDeductionProfileId: number | null;

  @Column('json', { name: 'ecom_policy_id_list', nullable: true })
  ecomPolicyIdList: number[] | null;

  @ManyToOne(
    () => DepartmentEntity,
    (department) => department.subscriptionServiceOrderActivations,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'department_id', referencedColumnName: 'id' }])
  department: DepartmentEntity;

  @ManyToOne(
    () => DevicePolicyEntity,
    (devicePolicy) => devicePolicy.subscriptionServiceOrderActivations,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'device_policy_id', referencedColumnName: 'id' }])
  devicePolicy: DevicePolicyEntity;

  @ManyToOne(
    () => SalaryDeductionProfileEntity,
    (salaryDeductionProfile) =>
      salaryDeductionProfile.subscriptionServiceOrderActivations,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn([
    { name: 'salary_deduction_profile_id', referencedColumnName: 'id' },
  ])
  salaryDeductionProfile: SalaryDeductionProfileEntity;

  @OneToOne(
    () => SubscriptionServiceOrdersEntity,
    (subscriptionServiceOrders) =>
      subscriptionServiceOrders.subscriptionServiceOrderActivation,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'id', referencedColumnName: 'id' }])
  subscriptionServiceOrders: SubscriptionServiceOrdersEntity;
}
