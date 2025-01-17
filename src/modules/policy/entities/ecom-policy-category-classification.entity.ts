import { EcomPolicyEntity } from '@/modules/asset/entities/ecom-policy.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('ecom.policy_category_classification', { schema: 'ecom' })
export class EcomPolicyCategoryClassificationEntity {
  @PrimaryColumn({ name: 'policy_id', nullable: false })
  policyId: number;

  @Column({ name: 'category_classification_id', nullable: true })
  categoryClassificationId: string | null;

  @ManyToOne(() => EcomPolicyEntity, (policy) => policy.id)
  @JoinColumn([{ name: 'policy_id', referencedColumnName: 'id' }])
  policy: EcomPolicyEntity;
}
