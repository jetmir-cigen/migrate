import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { EmployeeConsentEntity } from '@skytech/manager/modules/employee-consent/entities/employee-consent.entity';

@Entity({ name: 'control.employee_consent_cost_object' })
export class EmployeeConsentCostObjectEntity {
  @ManyToOne(() => EmployeeConsentEntity)
  @JoinColumn({ name: 'employee_consent_id' })
  employeeConsent: EmployeeConsentEntity;

  @PrimaryColumn({ name: 'employee_consent_id' }) employeeConsentId: number;
  @PrimaryColumn({ name: 'cost_object_id' }) costObjectId: number;

  @Column({
    type: 'timestamp',
    name: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  datetime: Date;
}
