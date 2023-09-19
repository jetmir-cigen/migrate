import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'ecom.policy' })
export class EcomPolicyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'customer_head_id', nullable: true })
  customerHeadId: number | null;

  @Column({ name: 'customer_id', nullable: true })
  customerId: number | null;

  @Column({ name: 'vendor_id', nullable: true })
  vendorId: number | null;

  @Column({ name: 'ecom_customer_id', nullable: true })
  ecomCustomerId: number | null;

  @Column({ name: 'name', nullable: true })
  name: string | null;

  @Column({ name: 'description', nullable: true, type: 'text' })
  description: string | null;

  @Column({ name: 'message_to_employee', nullable: true, type: 'text' })
  messageToEmployee: string | null;

  @Column({
    name: 'cover_amount',
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0.0,
    nullable: true,
  })
  coverAmount: number;

  @Column({
    name: 'cover_amount_init',
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: true,
  })
  coverAmountInit: number;

  @Column({
    name: 'minimum_amount',
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0.0,
    nullable: true,
  })
  minimumAmount: number;

  @Column({
    name: 'maximum_amount',
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 50000.0,
    nullable: true,
  })
  maximumAmount: number;

  @Column({ name: 'order_interval', type: 'int', default: 6, nullable: true })
  orderInterval: number;

  @Column({ name: 'cover_interval', type: 'int', default: 12, nullable: true })
  coverInterval: number;

  @Column({ name: 'payment_interval', type: 'int', default: 3, nullable: true })
  paymentInterval: number;

  @Column({ name: 'greenpool_type_id', nullable: true })
  greenpoolTypeId: string;

  @Column({
    name: 'greenpool_notification_email',
    type: 'text',
    nullable: true,
  })
  greenpoolNotificationEmail: string;

  @Column({ name: 'greenpool_splash_text', type: 'text', nullable: true })
  greenpoolSplashText: string;

  @Column({ name: 'greenpool_confirmation_text', type: 'text', nullable: true })
  greenpoolConfirmationText: string;

  @Column({
    name: 'is_manager_approval_required',
    type: 'tinyint',
    default: 1,
    nullable: true,
  })
  isManagerApprovalRequired: number;

  @Column({ name: 'has_vat', type: 'tinyint', default: 0, nullable: true })
  hasVat: number;

  @Column({
    name: 'is_custom_address_activated',
    type: 'tinyint',
    default: 1,
    nullable: true,
  })
  isCustomAddressActivated: number;

  @Column({
    name: 'is_buyout_allowed',
    type: 'tinyint',
    default: 0,
    nullable: true,
  })
  isBuyoutAllowed: number;

  @Column({
    name: 'is_asset_return_required',
    type: 'tinyint',
    default: 0,
    nullable: true,
  })
  isAssetReturnRequired: number;

  @Column({
    name: 'is_relations_ignored',
    type: 'int',
    default: 0,
    nullable: true,
  })
  isRelationsIgnored: number;

  @Column({ name: 'is_active', type: 'tinyint', default: 1, nullable: true })
  isActive: number;

  @Column({
    name: 'is_admin_restricted',
    type: 'tinyint',
    default: 0,
    nullable: true,
  })
  isAdminRestricted: number;

  @Column({ name: 'admin_overwrite_user_id', nullable: true })
  adminOverwriteUserId: number;

  @Column({ name: 'created_by', nullable: true })
  createdBy: number;

  @Column({
    name: 'created',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  created: Date;

  @Column({ name: 'updated_by', nullable: true })
  updatedBy: number;

  @Column({
    name: 'updated',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  updated: Date;
}
