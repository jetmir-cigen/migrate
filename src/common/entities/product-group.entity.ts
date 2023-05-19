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

  @Column({ length: 45 })
  name: string;

  @Column()
  product_category_id: number;

  @Column({ default: 47 })
  country_id: number;

  @ManyToOne(() => ProductCategoryEntity)
  @JoinColumn({ name: 'product_category_id' })
  productCategory: ProductCategoryEntity;

  @ManyToOne(() => CountryEntity, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'country_id' })
  country: CountryEntity;
}
