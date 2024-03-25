import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm';
import { EmployeeConsentEntity } from './employee-consent.entity';
import { CostObjectEntity } from './cost-object.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'control.employee_consent_cost_object' })
export class EmployeeConsentCostObjectEntity {
  @PrimaryColumn({ name: 'employee_consent_id' })
  employeeConsentId: number;

  @PrimaryColumn({ name: 'cost_object_id' })
  costObjectId: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP', type: 'datetime' })
  datetime: Date;

  @Column({ name: 'is_revoked', nullable: true })
  isRevoked: boolean;

  @Column({ name: 'is_revoked_datetime', nullable: true, type: 'datetime' })
  isRevokedDateTime: Date;

  @Column({ name: 'is_revoked_user_id', nullable: true })
  isRevokedUserId: number;

  @ManyToOne(
    () => EmployeeConsentEntity,
    (employeeConsent) => employeeConsent.employeeConsentCostObjects,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'employee_consent_id' })
  employeeConsent: EmployeeConsentEntity;

  @ManyToOne(
    () => CostObjectEntity,
    (costObject) => costObject.employeeConsentCostObjects,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'cost_object_id' })
  costObject: CostObjectEntity;

  @ManyToOne(() => UserEntity, (user) => user.employeeConsentCostObjects, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'is_revoked_user_id' })
  isRevokedUser: UserEntity;
}
