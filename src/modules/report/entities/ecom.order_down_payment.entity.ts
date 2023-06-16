import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity({ schema: 'ecom', name: 'order_down_payment' })
// @Index('order_down_payment_cost_object_id_fk', ['costObjectId'])
// @Index('order_down_payment_asset_id_fk', ['assetId'])
// @Index('order_down_payment_orders_id_fk', ['orderId'])
// @Index('order_down_payment_date_index', ['date', 'DESC'])
export class EOrderDownPaymentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'order_id', nullable: true })
  orderId: number | null;

  @Column({ name: 'cost_object_id', nullable: true })
  costObjectId: number | null;

  @Column({ name: 'asset_id', nullable: true })
  assetId: number | null;

  @Column({ type: 'decimal', precision: 20, scale: 2, nullable: true })
  amount: number | null;

  @Column({ default: 'NOK' })
  currency: string;

  @Column({ name: 'date', nullable: true })
  date: Date | null;

  @Column({ name: 'is_buyout', default: false })
  isBuyout: boolean;

  @Column({ name: 'is_off_boarding', default: false })
  isOffBoarding: boolean;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  // @ManyToOne(() => Order)
  // @JoinColumn({ name: 'order_id' })
  // order: Order;

  // @ManyToOne(() => Asset)
  // @JoinColumn({ name: 'asset_id' })
  // asset: Asset;
}
