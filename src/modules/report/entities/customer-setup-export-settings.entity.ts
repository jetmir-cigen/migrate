import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm';
import { CustomerEntity } from '@/modules/customer/entities/customer.entity';

@Entity({ name: 'customer_setup_export' })
export class CustomerSetupExportSettingsEntity {
  @PrimaryColumn({ name: 'customer_id' })
  customerId: number;

  @Column({ name: 'salary_deduction_code_usage', nullable: true })
  salaryDeductionCodeUsage: string;

  @Column({ name: 'salary_deduction_code_device', nullable: true })
  salaryDeductionCodeDevice: string;

  @Column({ name: 'salary_deduction_code_buyout', nullable: true })
  salaryDeductionCodeBuyout: string;

  @Column({ name: 'project_usage', nullable: true, length: 12 })
  projectUsage: string;

  @Column({ name: 'project_device', nullable: true, length: 12 })
  projectDevice: string;

  @Column({ name: 'department_override_usage', nullable: true, length: 12 })
  departmentOverrideUsage: string;

  @Column({ name: 'department_override_device', nullable: true, length: 12 })
  departmentOverrideDevice: string;

  @Column({ name: 'has_visma_global', default: false, nullable: true })
  hasVismaGlobal: boolean;

  @Column({ name: 'has_visma_lonn', default: false, nullable: true })
  hasVismaLonn: boolean;

  @Column({ name: 'has_visma_lonn_v2', default: false, nullable: true })
  hasVismaLonnV2: boolean;

  @Column({ name: 'has_visma_lonn_v3', default: false, nullable: true })
  hasVismaLonnV3: boolean;

  @Column({ name: 'has_visma_payroll', default: false, nullable: true })
  hasVismaPayroll: boolean;

  @Column({ name: 'has_huldt_og_lillevik', default: false, nullable: true })
  hasHuldtOgLillevik: boolean;

  @Column({ name: 'has_huldt_og_lillevik_sdv', default: false, nullable: true })
  hasHuldtOgLillevikSdv: boolean;

  @Column({ name: 'has_sap', default: false, nullable: true })
  hasSap: boolean;

  @Column({ name: 'has_sap_v2', default: false, nullable: true })
  hasSapV2: boolean;

  @Column({ name: 'has_tripletex', default: false, nullable: true })
  hasTripletex: boolean;

  @ManyToOne(() => CustomerEntity, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;
}
