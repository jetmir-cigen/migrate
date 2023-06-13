import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { CustomerHeadFrameAgreementEntity } from './customer-head-frame-agreement.entity';
import { CustomerEntity } from '@/modules/customer/entities/customer.entity';

@Entity({ schema: 'control', name: 'customer_head' })
export class CustomerHeadEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ name: 'org_no', nullable: true })
  @Index('customer_head_org_no', ['orgNo'])
  orgNo: string;

  @Column({ name: 'corporate_customer_id', nullable: true })
  corporateCustomerId: number;

  @ManyToOne(() => CustomerEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'corporate_customer_id' })
  corporateCustomer: CustomerEntity;

  @Column({ name: 'customer_head_frame_agreement_id' })
  customerHeadFrameAgreementId: number;

  @ManyToOne(() => CustomerHeadFrameAgreementEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'customer_head_frame_agreement_id' })
  customerHeadFrameAgreement: CustomerHeadFrameAgreementEntity;
}
