import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EcomProductCatalogueEntity } from './ecom-product-catalogue.entity';

@Index(
  'policy_product_customer_product_price_id_fk',
  ['customerProductPriceId'],
  {},
)
@Index(
  'policy_product_policy_id_product_catalogue_id_uindex',
  ['policyId', 'productCatalogueId'],
  { unique: true },
)
@Index('policy_product_product_catalogue_id_fk', ['productCatalogueId'], {})
@Entity('ecom.policy_product', { schema: 'ecom' })
export class EcomPolicyProductEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'policy_id', nullable: true })
  policyId: number | null;

  @Column('int', { name: 'product_catalogue_id', nullable: true })
  productCatalogueId: number | null;

  @Column('int', { name: 'customer_product_price_id', nullable: true })
  customerProductPriceId: number | null;

  @Column('varchar', { name: 'alias', nullable: true, length: 500 })
  alias: string | null;

  @Column('int', {
    name: 'quantity_limit',
    nullable: true,
    default: () => "'1'",
  })
  quantityLimit: number | null;

  @Column('tinyint', {
    name: 'is_mandatory',
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  isMandatory: boolean | null;

  @Column('tinyint', {
    name: 'is_quantities_allowed',
    nullable: true,
    default: () => "'0'",
  })
  isQuantitiesAllowed: number | null;

  @Column('tinyint', {
    name: 'is_app_only',
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  isAppOnly: boolean | null;

  @ManyToOne(
    () => EcomProductCatalogueEntity,
    (productCatalogue) => productCatalogue.policyProducts,
    { onDelete: 'CASCADE', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'product_catalogue_id', referencedColumnName: 'id' }])
  productCatalogue: EcomProductCatalogueEntity;
}
