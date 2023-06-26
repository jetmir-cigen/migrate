import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  ManyToOne,
} from 'typeorm';
import { CostObjectEntity } from '@/common/entities/cost-object.entity';

@Entity({ name: 'order_downpayment', schema: 'device_policy' })
export class OrderDownPaymentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'cost_object_id' })
  costObjectId: number;

  @Index('order_downpayment_order_id_index', ['orderId'])
  @Column({ name: 'order_id', nullable: true })
  orderId: number | null;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0.0 })
  amount: number;

  @Column({ type: 'varchar', length: 3, default: 'NOK', nullable: true })
  currency: string | null;

  @Index('order_downpayment_payment_date_index', ['paymentDate', 'DESC'])
  @Column({ name: 'payment_date', type: 'date' })
  paymentDate: Date;

  @Column({ name: 'is_buyout', type: 'tinyint', default: 0 })
  isBuyout: boolean;

  @ManyToOne(() => CostObjectEntity)
  costObject: CostObjectEntity;
}
