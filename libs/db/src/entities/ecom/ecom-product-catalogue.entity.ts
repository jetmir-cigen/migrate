import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { EcomCategoriesEntity } from './ecom-categories.entity';
import { EcomPolicyProductEntity } from './ecom-policy-product.entity';

@Index('fk_category_id_idx', ['categoryId'], {})
@Index('fk_ecom_vendor_id_idx', ['ecomVendorId'], {})
@Index('fk_manufacturer_id_idx', ['manufacturerId'], {})
@Index('idx_product_catalogue_vendor_unique_id', ['vendorUniqueId'], {})
@Index('product_catalogue_article_no', ['articleNo'], {})
@Index('product_catalogue_expired_index', ['expired'], {})
@Index('unique_product_catalogue_guid', ['productCatalogueGuid'], {
  unique: true,
})
@Entity('ecom.product_catalogue', { schema: 'ecom' })
export class EcomProductCatalogueEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'ecom_vendor_id', default: () => "'1'" })
  ecomVendorId: number;

  @Column('int', { name: 'category_id', nullable: true, default: () => "'1'" })
  categoryId: number | null;

  @Column('varchar', { name: 'unspsc_code', nullable: true, length: 50 })
  unspscCode: string | null;

  @Column('varchar', { name: 'article_no', length: 50 })
  articleNo: string;

  @Column('varchar', { name: 'article_name', length: 500 })
  articleName: string;

  @Column('varchar', { name: 'product_name', nullable: true, length: 500 })
  productName: string | null;

  @Column('varchar', { name: 'product_spec', nullable: true, length: 2000 })
  productSpec: string | null;

  @Column('varchar', {
    name: 'article_description',
    nullable: true,
    length: 2000,
  })
  articleDescription: string | null;

  @Column('varchar', { name: 'suitable_usage', nullable: true, length: 2000 })
  suitableUsage: string | null;

  @Column('varchar', {
    name: 'article_image_url',
    nullable: true,
    length: 2000,
  })
  articleImageUrl: string | null;

  @Column('varchar', { name: 'article_web_url', nullable: true, length: 2000 })
  articleWebUrl: string | null;

  @Column('int', { name: 'minimum_order_size', default: () => "'0'" })
  minimumOrderSize: number;

  @Column('decimal', {
    name: 'article_price',
    precision: 10,
    scale: 2,
    default: () => "'0.00'",
  })
  articlePrice: string;

  @Column('varchar', { name: 'currency', length: 45, default: () => "'NOK'" })
  currency: string;

  @Column('decimal', {
    name: 'vat_pct',
    nullable: true,
    precision: 10,
    scale: 2,
    default: () => "'25.00'",
  })
  vatPct: string | null;

  @Column('varchar', { name: 'keywords', nullable: true, length: 2000 })
  keywords: string | null;

  @Column('varchar', { name: 'related_articles', nullable: true, length: 2000 })
  relatedArticles: string | null;

  @Column('int', { name: 'manufacturer_id', default: () => "'1'" })
  manufacturerId: number;

  @Column('varchar', {
    name: 'manufacturer_product_no',
    nullable: true,
    length: 255,
  })
  manufacturerProductNo: string | null;

  @Column('varchar', {
    name: 'additional_product_info',
    nullable: true,
    length: 2000,
  })
  additionalProductInfo: string | null;

  @Column('datetime', { name: 'created', nullable: true })
  created: Date | null;

  @Column('datetime', { name: 'last_change', nullable: true })
  lastChange: Date | null;

  @Column('int', { name: 'expired', default: () => "'0'" })
  expired: number;

  @Column('int', { name: 'InStock', default: () => "'1'" })
  inStock: number;

  @Column('varchar', { name: 'NumInStock', length: 45, default: () => "'0'" })
  numInStock: string;

  @Column('varchar', { name: 'vendor_unique_id', nullable: true, length: 45 })
  vendorUniqueId: string | null;

  @Column('char', {
    name: 'product_catalogue_guid',
    unique: true,
    length: 36,
    default: () => "'uuid()'",
  })
  productCatalogueGuid: string;

  @ManyToOne(
    () => EcomCategoriesEntity,
    (categories) => categories.productCatalogues,
    {
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  category: EcomCategoriesEntity;

  @OneToMany(
    () => EcomPolicyProductEntity,
    (policyProduct) => policyProduct.productCatalogue,
  )
  policyProducts: EcomPolicyProductEntity[];
}
