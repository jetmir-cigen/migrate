import { UserEntity } from '@/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubscriptionServiceOrderActivationEntity } from './subscription-service-order-activation.entity';
import { SubscriptionServicesEntity } from './subscription-services.entity';

@Index('cost_element_id', ['costObjectId', 'subscriptionServiceId'], {})
@Index('subscription_service_id', ['subscriptionServiceId'], {})
@Index('created', ['created'], {})
@Index('subscription_service_orders_status_index', ['status'], {})
@Index('subscription_service_orders_updated_index', ['updated'], {})
@Index('subscription_service_orders_user_id_fk', ['createdUserId'], {})
@Index('subscription_service_orders_user_id_fk_2', ['updatedUserId'], {})
@Entity('subscription_service_orders', { schema: 'control' })
export class SubscriptionServiceOrdersEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'cost_object_id', nullable: true })
  costObjectId: number | null;

  @Column('int', { name: 'subscription_service_id' })
  subscriptionServiceId: number;

  @Column('int', {
    name: 'status',
    comment:
      '0=new,1=working,2=done,3=cancellation,4=cancelled,5=order_cancelled',
    default: () => "'0'",
  })
  status: number;

  @Column('timestamp', { name: 'created', nullable: true })
  created: Date | null;

  @Column('timestamp', {
    name: 'updated',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated: Date | null;

  @Column('decimal', {
    name: 'price',
    precision: 10,
    scale: 2,
    default: () => "'0.00'",
  })
  price: string;

  @Column('varchar', {
    name: 'currency',
    nullable: true,
    length: 3,
    default: () => "'NOK'",
  })
  currency: string | null;

  @Column('date', { name: 'activation_date', nullable: true })
  activationDate: string | null;

  @Column('mediumtext', { name: 'comment', nullable: true })
  comment: string | null;

  @Column('mediumtext', { name: 'dealer_comment', nullable: true })
  dealerComment: string | null;

  @Column('int', { name: 'created_user_id', nullable: true })
  createdUserId: number | null;

  @Column('int', { name: 'updated_user_id', nullable: true })
  updatedUserId: number | null;

  @Column('mediumtext', { name: 'customer_comment', nullable: true })
  customerComment: string | null;

  @Column('varchar', { name: 'api_order_id', nullable: true, length: 100 })
  apiOrderId: string | null;

  @Column('datetime', { name: 'api_order_date', nullable: true })
  apiOrderDate: Date | null;

  @Column('tinyint', { name: 'api_locked_for_process', default: () => "'0'" })
  apiLockedForProcess: number;

  @Column('int', { name: 'api_supplier_carrier_id', nullable: true })
  apiSupplierCarrierId: number | null;

  @Column('tinyint', {
    name: 'api_sync_aborted',
    comment:
      'Flag indicating api sync is aborted due to consecutive errors or missing requirements',
    default: () => "'0'",
  })
  apiSyncAborted: number;

  @Column('varchar', {
    name: 'api_order_sync_result',
    nullable: true,
    length: 255,
  })
  apiOrderSyncResult: string | null;

  @OneToOne(
    () => SubscriptionServiceOrderActivationEntity,
    (subscriptionServiceOrderActivation) =>
      subscriptionServiceOrderActivation.subscriptionServiceOrders,
  )
  subscriptionServiceOrderActivation: SubscriptionServiceOrderActivationEntity;

  @ManyToOne(
    () => SubscriptionServicesEntity,
    (subscriptionServices) => subscriptionServices.subscriptionServiceOrders,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'subscription_service_id', referencedColumnName: 'id' }])
  subscriptionService: SubscriptionServicesEntity;

  @ManyToOne(() => UserEntity, (user) => user.subscriptionServiceOrders, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'created_user_id', referencedColumnName: 'id' }])
  createdUser: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.subscriptionServiceOrders2, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'updated_user_id', referencedColumnName: 'id' }])
  updatedUser: UserEntity;
}
