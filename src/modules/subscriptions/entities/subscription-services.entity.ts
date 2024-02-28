import { CustomerEntity } from '@/modules/customer/entities/customer.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubscriptionServiceOrdersEntity } from './subscription-service-orders.entity';

@Index('customer_id', ['customerId'], {})
@Entity('subscription_services', { schema: 'control' })
export class SubscriptionServicesEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'customer_head_id', nullable: true })
  customerHeadId: number | null;

  @Column('int', { name: 'customer_id', nullable: true })
  customerId: number | null;

  @Column('decimal', { name: 'price', precision: 10, scale: 2 })
  price: string;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('int', { name: 'billing_cycle', default: () => "'1'" })
  billingCycle: number;

  @Column('tinyint', {
    name: 'is_active',
    nullable: true,
    default: () => "'1'",
  })
  isActive: number | null;

  @Column('tinyint', {
    name: 'is_exclusive',
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  isExclusive: boolean | null;

  @Column('varchar', {
    name: 'api_supplier_service_type',
    nullable: true,
    length: 45,
  })
  apiSupplierServiceType: string | null;

  @Column('int', { name: 'api_supplier_carrier_id', nullable: true })
  apiSupplierCarrierId: number | null;

  @Column('varchar', {
    name: 'api_supplier_service_id',
    nullable: true,
    length: 255,
  })
  apiSupplierServiceId: string | null;

  @Column('varchar', {
    name: 'api_supplier_service_description',
    nullable: true,
    length: 500,
  })
  apiSupplierServiceDescription: string | null;

  @Column('varchar', {
    name: 'api_supplier_service_original_name',
    nullable: true,
    length: 255,
  })
  apiSupplierServiceOriginalName: string | null;

  @Column('decimal', {
    name: 'api_supplier_service_original_price',
    nullable: true,
    precision: 10,
    scale: 2,
  })
  apiSupplierServiceOriginalPrice: string | null;

  @Column('tinyint', {
    name: 'is_default_subscription_service',
    default: () => "'0'",
  })
  isDefaultSubscriptionService: number;

  @Column('decimal', {
    name: 'api_supplier_service_original_discount',
    nullable: true,
    precision: 10,
    scale: 2,
  })
  apiSupplierServiceOriginalDiscount: string | null;

  @Column('datetime', {
    name: 'created',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created: Date | null;

  @OneToMany(
    () => SubscriptionServiceOrdersEntity,
    (subscriptionServiceOrders) =>
      subscriptionServiceOrders.subscriptionService,
  )
  subscriptionServiceOrders: SubscriptionServiceOrdersEntity[];

  @ManyToOne(
    () => CustomerEntity,
    (customer) => customer.subscriptionServices,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn([{ name: 'customer_id', referencedColumnName: 'id' }])
  customer: CustomerEntity;
}
