import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

Entity({ name: 'control.subscription_services' });
export class SubscriptionServiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, name: 'customer_head_id' })
  customerHeadId: number;

  @Column({ nullable: true, name: 'customer_id' })
  customerId: number;

  @Column()
  price: number;

  @Column()
  name: string;

  @Column({ name: 'billing_cycle' })
  billingCycle: number;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @Column({ default: false, name: 'is_exclusive' })
  isExclusive: boolean;

  @Column({ default: false, name: 'is_sim_card_product' })
  isSimCardProduct: boolean;

  @Column({ nullable: true, name: 'api_supplier_service_type' })
  apiSupplierServiceType: string;

  @Column({ nullable: true, name: 'api_supplier_carrier_id' })
  apiSupplierCarrierId: number;

  @Column({ nullable: true, name: 'api_supplier_service_id' })
  apiSupplierServiceId: string;

  @Column({ nullable: true, name: 'api_supplier_service_description' })
  apiSupplierServiceDescription: string;

  @Column({ nullable: true, name: 'api_supplier_service_original_name' })
  apiSupplierServiceOriginalName: string;

  @Column({ nullable: true, name: 'api_supplier_service_original_price' })
  apiSupplierServiceOriginalPrice: number;

  @Column({ default: false, name: 'is_default_subscription_service' })
  isDefaultSubscriptionService: boolean;

  @Column({ nullable: true, name: 'api_supplier_service_original_discount' })
  apiSupplierServiceOriginalDiscount: number;

  @Column({ name: 'created' })
  created: Date;

  @Column({ name: 'subscription_service_guid' })
  subscriptionServiceGuid: string;
}
