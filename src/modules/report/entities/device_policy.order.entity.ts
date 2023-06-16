import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { DPProductEntity } from './device_policy.product.entity';
import { CostObjectEntity } from '@/common/entities/cost-object.entity';

@Entity({ schema: 'device_policy', name: 'order' })
@Index('order_cost_object_id_fk', ['costObjectId'])
@Index('order_product_id_fk', ['productId'])
export class DPOrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'cost_object_id' })
  costObjectId: number;

  @ManyToOne(() => CostObjectEntity)
  @JoinColumn({ name: 'cost_object_id' })
  costObject: CostObjectEntity;

  @Column({ name: 'product_id' })
  productId: number;

  @ManyToOne(() => DPProductEntity)
  @JoinColumn({ name: 'product_id' })
  product: DPProductEntity;

  @Column({ name: 'down_payments' })
  downPayments: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: '0.00' })
  totalAmount: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: '0.00' })
  remainderAmount: number;

  @Column({ default: 'NOK' })
  currency: string;

  @Column({ name: 'order_date' })
  orderDate: Date;

  @Column()
  status: number;

  @Column({ name: 'delivery_date', nullable: true })
  deliveryDate: Date | null;

  @Column({ name: 'order_update' })
  orderUpdate: Date;

  @Column({ name: 'order_update_user_id', nullable: true })
  orderUpdateUserId: number | null;

  @Column({ name: 'estimated_delivery', nullable: true })
  estimatedDelivery: Date | null;

  @Column({ name: 'telenor_order_id', nullable: true })
  telenorOrderId: number | null;

  @Column({ nullable: true, length: 20 })
  imei: string | null;

  @Column({ nullable: true, length: 200 })
  address: string | null;

  @Column({ nullable: true, length: 10 })
  zip: string | null;

  @Column({ nullable: true, length: 200 })
  city: string | null;

  @Column({ name: 'dealer_comment', nullable: true, type: 'mediumtext' })
  dealerComment: string | null;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: '0.00' })
  totalLeasingAmount: number;

  @Column({ name: 'leasing_duration_months', default: 0 })
  leasingDurationMonths: number;

  @Column({ name: 'customer_comment', nullable: true, type: 'mediumtext' })
  customerComment: string | null;

  @Column({ name: 'buyout_old_phone', default: false })
  buyoutOldPhone: boolean;
}
