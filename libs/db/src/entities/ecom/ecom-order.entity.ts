import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ecom.orders' })
export class EcomOrderEntity {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column({ name: 'customer_id' })
  customerId: number;

  @Column({ name: 'fk_ecom_vendor_id', default: 1 })
  fkEcomVendorId: number;

  @Column({ name: 'order_date', type: 'datetime', nullable: true })
  orderDate: Date;

  @Column({ name: 'validto', type: 'datetime', nullable: true })
  validTo: Date;

  @Column({ name: 'customer_address_id', nullable: true })
  customerAddressId: number;

  @Column({ name: 'DeliveryAddress', length: 500, nullable: true })
  deliveryAddress: string;

  @Column({ name: 'DeliveryCity', length: 255, nullable: true })
  deliveryCity: string;

  @Column({ name: 'DeliveryZip', length: 10, nullable: true })
  deliveryZip: string;

  @Column({ name: 'DeliveryCountry', length: 45, nullable: true })
  deliveryCountry: string;

  @Column({ name: 'DeliveryPeriodStart', type: 'datetime', nullable: true })
  deliveryPeriodStart: Date;

  @Column({ name: 'DeliveryPeriodEnd', type: 'datetime', nullable: true })
  deliveryPeriodEnd: Date;

  @Column({ name: 'status', default: 0 })
  status: number;

  @Column({ name: 'SentDate', type: 'datetime', nullable: true })
  sentDate: Date;

  @Column({ name: 'OrderResponseDate', type: 'datetime', nullable: true })
  orderResponseDate: Date;

  @Column({ name: 'OrderResponseID', length: 255, nullable: true })
  orderResponseID: string;

  @Column({ name: 'OrderResponseNotes', length: 2000, nullable: true })
  orderResponseNotes: string;

  @Column({ name: 'VendorSalesOrderNo', length: 255, nullable: true })
  vendorSalesOrderNo: string;

  @Column({ name: 'ConfirmedDate', type: 'datetime', nullable: true })
  confirmedDate: Date;

  @Column({ name: 'DeliveredDate', type: 'datetime', nullable: true })
  deliveredDate: Date;

  @Column({ name: 'PromisedDeliveryStart', type: 'datetime', nullable: true })
  promisedDeliveryStart: Date;

  @Column({ name: 'PromisedDeliveryEnd', type: 'datetime', nullable: true })
  promisedDeliveryEnd: Date;

  @Column({ name: 'DespatchNo', length: 255, nullable: true })
  despatchNo: string;

  @Column({ name: 'DespatchDate', type: 'datetime', nullable: true })
  despatchDate: Date;

  @Column({ name: 'DespatchTrackingID', length: 1000, nullable: true })
  despatchTrackingID: string;

  @Column({ name: 'ActualDespatchDate', type: 'datetime', nullable: true })
  actualDespatchDate: Date;

  @Column({ name: 'OrderDocument', length: 255, nullable: true })
  orderDocument: string;

  @Column({ name: 'ResponsDocument', length: 255, nullable: true })
  responsDocument: string;

  @Column({ name: 'DespatchDocument', length: 255, nullable: true })
  despatchDocument: string;

  @Column({ name: 'device_policy_order_id', nullable: true })
  devicePolicyOrderId: number;

  @Column({ name: 'control_user_id', nullable: true })
  controlUserId: number;

  @Column({ name: 'internal_notes', length: 255, nullable: true })
  internalNotes: string;

  @Column({ name: 'policy_id', nullable: true })
  policyId: number;

  @Column({ name: 'cost_object_id', nullable: true })
  costObjectId: number;

  @Column({ name: 'vendor_status_code', length: 45, nullable: true })
  vendorStatusCode: string;

  @Column({ name: 'vendor_status_text', length: 255, nullable: true })
  vendorStatusText: string;

  @Column({ name: 'dealer_comment', type: 'text', nullable: true })
  dealerComment: string;

  @Column({ name: 'internal_comment', type: 'text', nullable: true })
  internalComment: string;

  @Column({
    name: 'updated',
    type: 'datetime',
    nullable: true,
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated: Date;

  @Column({ name: 'updated_user_id', nullable: true })
  updatedUserId: number;

  @Column({ name: 'ecom_shipping_options_id', nullable: true })
  ecomShippingOptionsId: number;

  @Column({
    name: 'cover_amount',
    type: 'decimal',
    precision: 20,
    scale: 2,
    default: 0.0,
  })
  coverAmount: number;

  @Column({
    name: 'remainder_amount',
    type: 'decimal',
    precision: 20,
    scale: 2,
    default: 0.0,
  })
  remainderAmount: number;

  @Column({ name: 'currency', length: 3, default: 'NOK' })
  currency: string;

  @Column({ name: 'down_payments', default: 0 })
  downPayments: number;

  @Column({ name: 'ignore', type: 'tinyint', default: 0 })
  ignore: boolean;

  @Column({ name: 'delivery_status_id', default: 0 })
  deliveryStatusId: number;

  @Column({ name: 'delivery_status_date', type: 'datetime', nullable: true })
  deliveryStatusDate: Date;

  @Column({ name: 'delivery_status_user_id', nullable: true })
  deliveryStatusUserId: number;
}
