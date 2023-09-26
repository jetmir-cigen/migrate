import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'assets.asset' })
export class AssetEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'asset_description', nullable: true })
  assetDescription: string;

  @Column({ name: 'device_policy_product_id', nullable: true })
  devicePolicyProductId: number;

  @Column({ name: 'ecom_product_id', nullable: true })
  ecomProductId: number;

  @Column({ name: 'order_id', nullable: true })
  orderId: number;

  @Column({ name: 'ecom_order_id', nullable: true })
  ecomOrderId: number;

  @Column({ name: 'ecom_orderline_id', nullable: true })
  ecomOrderlineId: number;

  @Column({ name: 'onboarding_order_id', nullable: true })
  onboardingOrderId: number;

  @Column({ name: 'cost_object_id', nullable: true })
  costObjectId: number;

  @Column({ name: 'customer_id', nullable: true })
  customerId: number;

  @Column({ name: 'customer_address_id', nullable: true })
  customerAddressId: number;

  @Column({ name: 'type_id', default: 7 })
  typeId: number;

  @Column({ name: 'status_id', default: 1 })
  statusId: number;

  @Column({ name: 'ownership_id', default: 1 })
  ownershipId: number;

  @Column({ name: 'is_leased', default: false })
  isLeased: boolean;

  @Column({ name: 'leasing_vendor_id', nullable: true })
  leasingVendorId: number;

  @Column({ name: 'user_type_id', default: 3 })
  userTypeId: number;

  @Column({ name: 'user_type_description', nullable: true })
  userTypeDescription: string;

  @Column({ name: 'imei_snr', nullable: true, length: 100 })
  imeiSnr: string;

  @Column({ name: 'active', default: true })
  active: boolean;

  @Column({
    name: 'cost',
    type: 'decimal',
    precision: 12,
    scale: 4,
    nullable: true,
  })
  cost: number;

  @Column({ name: 'recieved', nullable: true, type: 'date' })
  received: Date;

  @Column({ name: 'lease_end', nullable: true, type: 'date' })
  leaseEnd: Date;

  @Column({ name: 'dealer_user_id', nullable: true })
  dealerUserId: number;

  @Column({ name: 'return_status_id', nullable: true })
  returnStatusId: number;

  @Column({ name: 'result', nullable: true, length: 4 })
  result: string;

  @Column({
    name: 'result_cost',
    type: 'decimal',
    precision: 12,
    scale: 4,
    nullable: true,
  })
  resultCost: number;

  @Column({ name: 'delete_certificate', nullable: true })
  deleteCertificate: boolean;

  @Column({ name: 'delete_certificate_date', nullable: true, type: 'date' })
  deleteCertificateDate: Date;

  @Column({ name: 'incoming_invoice_id', nullable: true })
  incomingInvoiceId: number;

  @Column({ name: 'outgoing_invoice_id', nullable: true })
  outgoingInvoiceId: number;

  @Column({ name: 'comment', nullable: true, type: 'mediumtext' })
  comment: string;

  @Column({ name: 'created_date', nullable: true, type: 'datetime' })
  createdDate: Date;

  @Column({ name: 'edited_user_id', nullable: true })
  editedUserId: number;

  @Column({ name: 'edited_date', nullable: true, type: 'datetime' })
  editedDate: Date;

  @Column({ name: 'created_user_id', nullable: true })
  createdUserId: number;

  @Column({ name: 'department_id', nullable: true })
  departmentId: number;
}
