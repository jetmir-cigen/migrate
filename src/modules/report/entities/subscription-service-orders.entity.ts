import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SubscriptionServiceEntity } from './subscription-services.entity';

@Entity({ name: 'control.subscription_service_order' })
export class SubscriptionServiceOrderEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, name: 'cost_object_id' })
  costObjectId: number;

  @ManyToOne(() => SubscriptionServiceEntity)
  @JoinColumn({ name: 'subscription_service_id' })
  subscriptionService: SubscriptionServiceEntity;

  @Column({ default: 0 })
  status: number;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  price: number;

  @Column({ length: 3, default: 'NOK' })
  currency: string;

  @Column({ nullable: true, name: 'activation_date' })
  activationDate: Date;

  @Column({ nullable: true })
  comment: string;

  @Column({ nullable: true, name: 'dealer_comment' })
  dealerComment: string;

  @Column({ nullable: true, name: 'created_user_id' })
  createdUserId: number;

  @Column({ nullable: true, name: 'updated_user_id' })
  updatedUserId: number;

  @Column({ nullable: true, name: 'customer_comment' })
  customerComment: string;

  @Column({ nullable: true, name: 'api_order_id' })
  apiOrderId: string;

  @Column({ nullable: true, name: 'api_order_date' })
  apiOrderDate: Date;

  @Column({ default: 0, name: 'api_locked_for_process' })
  apiLockedForProcess: boolean;

  @Column({ default: 0, name: 'api_sync_aborted' })
  apiSyncAborted: boolean;

  @Column({ nullable: true, name: 'api_order_sync_result' })
  apiOrderSyncResult: string;

  @Column({ name: 'subscription_service_order_guid' })
  subscriptionServiceOrderGuid: string;
}
