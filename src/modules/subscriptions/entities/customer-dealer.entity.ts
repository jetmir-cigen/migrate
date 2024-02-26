import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('customer_dealer_is_sub_index', ['isSub'], {})
@Index('customer_dealer_ecom_vendor_id_fk', ['ecomVendorId'], {})
@Index('customer_dealer_customer_id_fk', ['customerId'], {})
@Index('customer_dealer_customer_id_fk_2', ['dealerCustomerId'], {})
@Entity('dealer.customer_dealer')
export class CustomerDealerEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'customer_id', nullable: true })
  customerId: number | null;

  @Column('int', { name: 'dealer_customer_id', nullable: true })
  dealerCustomerId: number | null;

  @Column('int', { name: 'ecom_vendor_id', nullable: true })
  ecomVendorId: number | null;

  @Column('tinyint', {
    name: 'is_sub',
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  isSub: boolean | null;

  @Column('tinyint', {
    name: 'is_device_policy',
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  isDevicePolicy: boolean | null;

  @Column('decimal', {
    name: 'provision_pct',
    nullable: true,
    precision: 4,
    scale: 3,
    default: () => "'0.000'",
  })
  provisionPct: string | null;
}
