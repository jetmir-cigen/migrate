import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity({ schema: 'device_policy', name: 'product' })
@Index('customer_id', ['customerId'])
@Index('product_available_index', ['available'])
@Index('product_customer_id_index', ['customerId'])
@Index('product_vendor_id_index', ['vendorId'])
@Index('product_product_catalogue_id_fk', ['ecomProductCatalogueId'])
@Index('product_artice_id_index', ['articeId'])
@Index('product_model_device_code_index', ['model', 'device', 'code'])
@Index('product_product_number_index', ['productNumber'])
export class DPProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'customer_id' })
  customerId: number;

  @Column()
  device: string;

  @Column()
  model: string;

  @Column()
  code: string | null;

  @Column({ name: 'artice_id' })
  articeId: string | null;

  @Column({ name: 'product_number' })
  productNumber: string | null;

  @Column({ name: 'telenor_active' })
  telenorActive: number;

  @Column({ nullable: true })
  price: number | null;

  @Column({ default: '0' })
  stock: string;

  @Column({ default: false })
  available: boolean;

  @Column({ default: 'MOBILE_PHONE' })
  type: string;

  @Column({ name: 'img_url', nullable: true, type: 'text' })
  imgUrl: string | null;

  @Column({ name: 'vendor_id' })
  vendorId: number;

  //   @ManyToOne(() => Vendor)
  //   @JoinColumn({ name: 'vendor_id' })
  //   vendor: Vendor;

  @Column({ name: 'ecom_product_catalogue_id', nullable: true })
  ecomProductCatalogueId: number | null;

  //   @ManyToOne(() => ProductCatalogue)
  //   @JoinColumn({ name: 'ecom_product_catalogue_id' })
  //   ecomProductCatalogue: ProductCatalogue;
}
