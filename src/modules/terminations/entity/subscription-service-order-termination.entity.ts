import { SubscriptionServiceOrdersEntity } from '@/modules/subscriptions/entities/subscription-service-orders.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

@Index('subscription_service_order_termination_id_uindex', ['id'], {
  unique: true,
})
@Entity('subscription_service_order_termination', { schema: 'control' })
export class SubscriptionServiceOrderTerminationEntity {
  @PrimaryColumn('int', { name: 'id' })
  id: number;

  @Column('int', { name: 'type_id', default: () => "'1'" })
  typeId: number;

  @Column('varchar', { name: 'type', nullable: true, length: 100 })
  type: string | null;

  @Column('varchar', { name: 'code', nullable: true, length: 255 })
  code: string | null;

  @Column('varchar', { name: 'birth_date_org_no', nullable: true, length: 255 })
  birthDateOrgNo: string | null;

  @Column('datetime', { name: 'acceptance_given', nullable: true })
  acceptanceGiven: Date | null;

  @Column('datetime', { name: 'user_submission', nullable: true })
  userSubmission: Date | null;

  @Column('datetime', { name: 'termination_date', nullable: true })
  terminationDate: Date | null;

  @Column('int', { name: 'asset_id', nullable: true })
  assetId: number | null;

  @Column('varchar', { name: 'asset_buyout_type', nullable: true, length: 20 })
  assetBuyoutType: string | null;

  @Column('decimal', {
    name: 'asset_buyout_price',
    nullable: true,
    precision: 20,
    scale: 2,
    default: () => "'0.00'",
  })
  assetBuyoutPrice: string | null;

  @Column('decimal', {
    name: 'asset_return_price',
    nullable: true,
    precision: 20,
    scale: 2,
    default: () => "'0.00'",
  })
  assetReturnPrice: string | null;

  @Column('json', { name: 'assets', nullable: true })
  assets: object | null;

  @OneToOne(
    () => SubscriptionServiceOrdersEntity,
    (subscriptionServiceOrders) =>
      subscriptionServiceOrders.subscriptionServiceOrderTermination,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'id', referencedColumnName: 'id' }])
  subscriptionServiceOrders: SubscriptionServiceOrdersEntity;
}
