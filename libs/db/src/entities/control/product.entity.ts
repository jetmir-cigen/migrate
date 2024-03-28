import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ProductGroupEntity } from './product-group.entity';

@Entity({ name: 'control.product' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'product_group_id', type: 'int', nullable: true })
  productGroupId: number;

  @Column({ name: 'name', type: 'varchar', length: 75, nullable: true })
  name: string;

  @Column({
    name: 'cost_type',
    type: 'int',
    nullable: true,
    default: 0,
    comment: '0=Ok, 1=Watchlist, 2=Bad',
  })
  costType: number;

  @Column({ name: 'vat', type: 'bit', nullable: true })
  vat: boolean;

  @Column({
    name: 'price_type',
    type: 'char',
    length: 1,
    nullable: true,
    comment:
      'Type of price. \nQ=Quantity\nT=Usage, time \nD=Usage, data\nS=Subscription',
  })
  priceType: string;

  @Column({
    name: 'no_price_check',
    type: 'bit',
    nullable: true,
    default: false,
  })
  noPriceCheck: boolean;

  @Column({ name: 'sort_order', type: 'int', default: null })
  sortOrder: number | null;

  @Column({ name: 'country_code', type: 'char', length: 4, default: null })
  countryCode: string | null;

  @Column({ name: 'tax_report', type: 'bit', nullable: true, default: false })
  taxReport: boolean;

  @Column({ name: 'product_type', type: 'int', nullable: true, default: 0 })
  productType: number;

  @Column({ name: 'vat_included', type: 'bit', nullable: true, default: false })
  vatIncluded: boolean;

  @Column({ name: 'country_id', type: 'int', nullable: true, default: 47 })
  countryId: number;

  @Column({
    name: 'vat_rate',
    type: 'decimal',
    scale: 2,
    precision: 4,
    nullable: true,
    default: 0.25,
  })
  vatRate: number;

  @ManyToOne(() => ProductGroupEntity)
  @JoinColumn({ name: 'product_group_id' })
  productGroup: ProductGroupEntity;
}
