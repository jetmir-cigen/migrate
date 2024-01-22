import { CountryEntity } from '@/common/entities/country.entity';
import { CustomerEntity } from '@/modules/customer/entities/customer.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('unique_customer_address_guid', ['customerAddressGuid'], {
  unique: true,
})
@Index('customer_address_customer_id_idx', ['customerId'], {})
@Index('customer_address_country_id_fk', ['countryId'], {})
@Entity('customer_address', { schema: 'control' })
export class CustomerAddressEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'customer_head_id', nullable: true })
  customerHeadId: number | null;

  @Column('int', { name: 'customer_id', nullable: true })
  customerId: number | null;

  @Column('varchar', { name: 'address', nullable: true, length: 200 })
  address: string | null;

  @Column('varchar', { name: 'zip', nullable: true, length: 10 })
  zip: string | null;

  @Column('varchar', { name: 'city', nullable: true, length: 200 })
  city: string | null;

  @Column('varchar', { name: 'country', nullable: true, length: 50 })
  countryName: string | null;

  @Column('int', { name: 'country_id', nullable: true, default: () => "'47'" })
  countryId: number | null;

  @Column('tinyint', {
    name: 'is_active',
    nullable: true,
    width: 1,
    default: () => "'1'",
  })
  isActive: boolean | null;

  @Column('char', {
    name: 'customer_address_guid',
    unique: true,
    length: 36,
    default: () => "'uuid()'",
  })
  customerAddressGuid: string;

  @ManyToOne(() => CountryEntity, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'country_id', referencedColumnName: 'id' }])
  country: CountryEntity;

  @ManyToOne(() => CustomerEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'customer_id', referencedColumnName: 'id' }])
  customer: CustomerEntity;
}
