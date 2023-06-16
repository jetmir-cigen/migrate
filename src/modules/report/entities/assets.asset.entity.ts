import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'asset', schema: 'assets' })
@Index('asset_asset_type_id_fk', ['typeId'])
@Index('asset_user_type_id_fk', ['userTypeId'])
@Index('asset_asset_status_id_fk', ['statusId'])
@Index('asset_product_id_fk', ['devicePolicyProductId'])
@Index('asset_imei_snr_index', ['imeiSnr'])
@Index('asset_user_type_description_index', ['userTypeDescription'])
@Index('asset_return_status_id_fk', ['returnStatusId'])
@Index('asset_ownership_id_fk', ['ownershipId'])
@Index('asset_cost_object_id_fk', ['costObjectId'])
@Index('asset_order_id_fk', ['orderId'])
@Index('asset_orders_ID_fk', ['ecomOrderId'])
@Index('asset_orderlines_ID_fk', ['ecomOrderlineId'])
export class AAssetEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'asset_description', nullable: true })
  assetDescription: string | null;

  @Column({ name: 'device_policy_product_id', nullable: true })
  devicePolicyProductId: number | null;

  @Column({ name: 'ecom_product_id', nullable: true })
  ecomProductId: number | null;

  @Column({ name: 'order_id', nullable: true })
  orderId: number | null;

  @Column({ name: 'ecom_order_id', nullable: true })
  ecomOrderId: number | null;

  @Column({ name: 'ecom_orderline_id', nullable: true })
  ecomOrderlineId: number | null;

  @Column({ name: 'onboarding_order_id', nullable: true })
  onboardingOrderId: number | null;

  @Column({ name: 'cost_object_id', nullable: true })
  costObjectId: number | null;

  @Column({ name: 'customer_id', nullable: true })
  customerId: number | null;

  @Column({ name: 'customer_address_id', nullable: true })
  customerAddressId: number | null;

  @Column({ name: 'type_id', default: 7 })
  typeId: number;

  @Column({ name: 'status_id', default: 1 })
  statusId: number;

  @Column({ name: 'ownership_id', default: 1 })
  ownershipId: number;

  @Column({ name: 'is_leased', default: false })
  isLeased: boolean;

  @Column({ name: 'leasing_vendor_id', nullable: true })
  leasingVendorId: number | null;

  @Column({ name: 'user_type_id', default: 3 })
  userTypeId: number;

  @Column({ name: 'user_type_description', nullable: true })
  userTypeDescription: string | null;

  @Column({ name: 'imei_snr', nullable: true })
  imeiSnr: string | null;

  @Column({ default: true })
  active: boolean;

  @Column({ nullable: true })
  cost: number | null;

  @Column({ nullable: true })
  recieved: Date | null;

  @Column({ name: 'lease_end', nullable: true })
  leaseEnd: Date | null;

  @Column({ name: 'dealer_user_id', nullable: true })
  dealerUserId: number | null;

  @Column({ name: 'return_status_id', nullable: true })
  returnStatusId: number | null;

  @Column({ nullable: true })
  result: string | null;

  @Column({ name: 'result_cost', nullable: true })
  resultCost: number | null;

  @Column({ name: 'delete_certificate', nullable: true })
  deleteCertificate: boolean | null;

  @Column({ name: 'delete_certificate_date', nullable: true })
  deleteCertificateDate: Date | null;

  @Column({ name: 'incoming_invoice_id', nullable: true })
  incomingInvoiceId: number | null;

  @Column({ name: 'outgoing_invoice_id', nullable: true })
  outgoingInvoiceId: number | null;

  @Column({ type: 'mediumtext', nullable: true })
  comment: string | null;

  @Column({ name: 'created_date', nullable: true })
  createdDate: Date | null;

  @Column({ name: 'edited_user_id', nullable: true })
  editedUserId: number | null;

  @Column({ name: 'edited_date', nullable: true })
  editedDate: Date | null;

  @Column({ name: 'created_user_id', nullable: true })
  createdUserId: number | null;

  @Column({ name: 'department_id', nullable: true })
  departmentId: number | null;

  // Define relationships if needed
}
