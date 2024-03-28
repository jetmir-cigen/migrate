import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { EcomCategoryClassificationEntity } from './ecom-category-classification.entity';
import { EcomProductCatalogueEntity } from './ecom-product-catalogue.entity';

@Index('categories_asset_type_id_fk', ['assetTypeId'], {})
@Index('categories_category_classification_id_fk', ['classificationId'], {})
@Index('unique_categories_guid', ['categoriesGuid'], { unique: true })
@Entity('ecom.categories', { schema: 'ecom' })
export class EcomCategoriesEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('int', { name: 'parent_category_id', nullable: true })
  parentCategoryId: number | null;

  @Column('datetime', { name: 'created', nullable: true })
  created: Date | null;

  @Column('datetime', { name: 'last_change', nullable: true })
  lastChange: Date | null;

  @Column('int', { name: 'main_category_id', nullable: true })
  mainCategoryId: number | null;

  @Column('int', { name: 'ecom_vendor_id', nullable: true })
  ecomVendorId: number | null;

  @Column('varchar', { name: 'category_path', nullable: true, length: 255 })
  categoryPath: string | null;

  @Column('varchar', {
    name: 'leasing_product_type',
    nullable: true,
    length: 32,
  })
  leasingProductType: string | null;

  @Column('varchar', { name: 'classification_id', nullable: true, length: 32 })
  classificationId: string | null;

  @Column('int', { name: 'asset_type_id', nullable: true })
  assetTypeId: number | null;

  @Column('char', {
    name: 'categories_guid',
    unique: true,
    length: 36,
    default: () => "'uuid()'",
  })
  categoriesGuid: string;

  @ManyToOne(
    () => EcomCategoryClassificationEntity,
    (categoryClassification) => categoryClassification.categories,
    { onDelete: 'SET NULL', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'classification_id', referencedColumnName: 'id' }])
  classification: EcomCategoryClassificationEntity;

  @OneToMany(
    () => EcomProductCatalogueEntity,
    (productCatalogue) => productCatalogue.category,
  )
  productCatalogues: EcomProductCatalogueEntity[];
}
