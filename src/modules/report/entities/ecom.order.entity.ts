import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity({ schema: 'ecom', name: 'orders' })
@Index('fk_ecom_orders_customer_id_idx', ['customerId'])
@Index('fk_ecom_orders_ecom_vendor_id_idx', ['ecomVendorId'])
@Index('orders_policy_id_fk', ['policyId'])
@Index('orders_order_status_id_fk', ['status'])
@Index('orders_user_id_fk', ['updatedUserId'])
@Index('orders_order_date_index', ['orderDate'])
export class EOrderEntity {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column({ name: 'customer_id' })
  customerId: number;

  @Column({ name: 'fk_ecom_vendor_id' })
  ecomVendorId: number;

  @Column({ name: 'order_date', nullable: true })
  orderDate: Date | null;

  @Column({ nullable: true })
  validto: Date | null;

  @Column({ name: 'customer_address_id', nullable: true })
  customerAddressId: number | null;

  @Column({ name: 'DeliveryAddress', nullable: true })
  deliveryAddress: string | null;

  @Column({ name: 'DeliveryCity', nullable: true })
  deliveryCity: string | null;

  @Column({ name: 'DeliveryZip', nullable: true })
  deliveryZip: string | null;

  @Column({ name: 'DeliveryCountry', nullable: true })
  deliveryCountry: string | null;

  @Column({ name: 'DeliveryPeriodStart', nullable: true })
  deliveryPeriodStart: Date | null;

  @Column({ name: 'DeliveryPeriodEnd', nullable: true })
  deliveryPeriodEnd: Date | null;

  @Column({ default: 0 })
  status: number;

  @Column({ name: 'SentDate', nullable: true })
  sentDate: Date | null;

  @Column({ name: 'OrderResponseDate', nullable: true })
  orderResponseDate: Date | null;

  @Column({ name: 'OrderResponseID', nullable: true })
  orderResponseId: string | null;

  @Column({ name: 'OrderResponseNotes', nullable: true })
  orderResponseNotes: string | null;

  @Column({ name: 'VendorSalesOrderNo', nullable: true })
  vendorSalesOrderNo: string | null;

  @Column({ name: 'ConfirmedDate', nullable: true })
  confirmedDate: Date | null;

  @Column({ name: 'DeliveredDate', nullable: true })
  deliveredDate: Date | null;

  @Column({ name: 'PromisedDeliveryStart', nullable: true })
  promisedDeliveryStart: Date | null;

  @Column({ name: 'PromisedDeliveryEnd', nullable: true })
  promisedDeliveryEnd: Date | null;

  @Column({ name: 'DespatchNo', nullable: true })
  despatchNo: string | null;

  @Column({ name: 'DespatchDate', nullable: true })
  despatchDate: Date | null;

  @Column({ name: 'DespatchTrackingID', nullable: true })
  despatchTrackingId: string | null;

  @Column({ name: 'ActualDespatchDate', nullable: true })
  actualDespatchDate: Date | null;

  @Column({ name: 'OrderDocument', nullable: true })
  orderDocument: string | null;

  @Column({ name: 'ResponsDocument', nullable: true })
  responsDocument: string | null;

  @Column({ name: 'DespatchDocument', nullable: true })
  despatchDocument: string | null;

  @Column({ name: 'device_policy_order_id', nullable: true })
  devicePolicyOrderId: number | null;

  @Column({ name: 'control_user_id', nullable: true })
  controlUserId: number | null;

  @Column({ name: 'internal_notes', nullable: true })
  internalNotes: string | null;

  @Column({ name: 'policy_id', nullable: true })
  policyId: number | null;

  @Column({ name: 'cost_object_id', nullable: true })
  costObjectId: number | null;

  @Column({ name: 'vendor_status_code', nullable: true })
  vendorStatusCode: string | null;

  @Column({ name: 'vendor_status_text', nullable: true })
  vendorStatusText: string | null;

  @Column({ type: 'text', nullable: true })
  dealerComment: string | null;

  @Column({ type: 'text', nullable: true })
  internalComment: string | null;

  @Column({
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated: Date | null;

  @Column({ name: 'updated_user_id', nullable: true })
  updatedUserId: number | null;

  @Column({ name: 'ecom_shipping_options_id', nullable: true })
  ecomShippingOptionsId: number | null;

  @Column({
    name: 'cover_amount',
    type: 'decimal',
    precision: 20,
    scale: 2,
    default: '0.00',
  })
  coverAmount: number;

  @Column({
    name: 'remainder_amount',
    type: 'decimal',
    precision: 20,
    scale: 2,
    default: '0.00',
  })
  remainderAmount: number;

  @Column({ default: 'NOK' })
  currency: string;

  @Column({ name: 'down_payments', default: 0 })
  downPayments: number;

  @Column({ default: false })
  ignore: boolean;

  // Add relationships to other entities if needed
}
