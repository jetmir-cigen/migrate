import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity({ schema: 'device_policy', name: 'order_downpayment' })
// @Index('order_downpayment_cost_object_id_fk', ['costObjectId'])
// @Index('order_downpayment_order_id_index', ['orderId'])
// @Index('order_downpayment_payment_date_index', ['paymentDate', 'DESC'])
export class DPOrderDownPaymentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'cost_object_id' })
  costObjectId: number;

  @Column({ name: 'order_id' })
  orderId: number;
  //   @ManyToOne(() => Order)
  //   @JoinColumn({ name: 'order_id' })
  //   order: Order;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: '0.00' })
  amount: number;

  @Column({ default: 'NOK' })
  currency: string;

  @Column({ name: 'payment_date' })
  paymentDate: Date;

  @Column({ name: 'is_buyout', default: false })
  isBuyout: boolean;
}
