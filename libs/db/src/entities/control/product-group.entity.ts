import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CountryEntity } from './country.entity';
import { ProductCategoryEntity } from './product-category.entity';

@Entity({ name: 'control.product_group' })
export class ProductGroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', length: 45 })
  name: string;

  @Column({ name: 'product_category_id' })
  productCategoryId: number;

  @Column({ name: 'country_id', default: 47 })
  countryId: number;

  @ManyToOne(() => ProductCategoryEntity)
  @JoinColumn({ name: 'product_category_id' })
  productCategory: ProductCategoryEntity;

  @ManyToOne(() => CountryEntity, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'country_id' })
  country: CountryEntity;
}
