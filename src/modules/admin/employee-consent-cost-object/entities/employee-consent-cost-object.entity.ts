import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { EmployeeConsentEntity } from '../../employee-consent/entities/employee-consent.entity';

@Entity('employee-consent-cost-object')
export class EmployeeConsentCostObjectEntity {
  @Column({ type: 'datetime', nullable: true })
  datetime: Date;

  @OneToOne(() => EmployeeConsentEntity, (consent) => consent.id, {
    nullable: true,
  })
  @JoinColumn({ name: 'employee_consent' })
  employeeConsent: EmployeeConsentEntity;

  @Column({ name: 'employee_consent_id' })
  employeeConsentId: number;

  // missing entity
  @Column({ nullable: true, name: 'cost_object_id' })
  costObjectId: number;
}
