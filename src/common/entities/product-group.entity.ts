import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProductCategoryEntity } from './product-category.entity';
import { CountryEntity } from './country.entity';

@Entity({ name: 'product_group' })
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
