import { CostObjectEntity } from '@/common/entities/cost-object.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { InvoiceEntity } from './invoice.entity';
import { ProductEntity } from '@/common/entities/product.entity';

@Entity({ name: 'control.invoice_row' })
export class InvoiceRowEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'invoice_id',
    type: 'int',
    nullable: true,
  })
  invoiceId: number;

  @Column({
    name: 'product_id',
    type: 'int',
    nullable: true,
  })
  productId: number;

  @Column({
    name: 'cost_object_id',
    type: 'int',
    nullable: true,
  })
  costObjectId: number;

  @Column({
    name: 'quantity',
    type: 'float',
    nullable: true,
  })
  quantity: number;

  @Column({
    name: 'peak_volume',
    type: 'bigint',
    nullable: true,
  })
  peakVolume: number;

  @Column({
    name: 'off_peak_volume',
    type: 'int',
    nullable: true,
  })
  offPeakVolume: number;

  @Column({
    name: 'amount',
    type: 'decimal',
    scale: 2,
    nullable: true,
  })
  amount: number;

  @Column({
    name: 'contract_amount',
    type: 'decimal',
    scale: 2,
    nullable: true,
  })
  contractAmount: number;

  @Column({
    name: 'from_period',
    type: 'date',
  })
  fromPeriod: Date;

  @Column({
    name: 'to_period',
    type: 'date',
  })
  toPeriod: Date;

  @Column({
    name: 'text',
    type: 'varchar',
    length: 255,
  })
  text: string;

  @Column({
    name: 'billed',
    type: 'date',
  })
  billed: Date;

  @Column({
    name: 'exception_status',
    type: 'int',
    nullable: true,
    default: 0,
  })
  exceptionStatus: number;

  @Column({
    name: 'exception_comment',
    type: 'varchar',
    length: 255,
  })
  exceptionComment: string;

  @Column({
    name: 'private',
    type: 'int',
    nullable: true,
    default: 0,
    comment:
      '1 = application job related , 2 = private, 3 = not private, 4 = application private',
  })
  private: number;

  @Column({
    name: 'private_comment',
    type: 'varchar',
    length: 255,
  })
  privateComment: string;

  @Column({
    name: 'salary_deduction_amount',
    type: 'decimal',
    scale: 2,
    nullable: true,
    default: '0.00',
  })
  salaryDeductionAmount: number;

  @Column({
    name: 'pending_salary_deduction_amount',
    type: 'decimal',
    scale: 2,
    nullable: true,
    default: '0.00',
  })
  pendingSalaryDeductionAmount: number;

  @Column({
    name: 'vendor_vat_amount',
    type: 'decimal',
    scale: 2,
    default: null,
  })
  vendorVatAmount: number;

  @Column({
    name: 'cost_reference',
    type: 'varchar',
    length: 125,
    default: null,
  })
  costReference: string;

  @Column({
    name: 'vat_amount',
    type: 'decimal',
    scale: 2,
    default: null,
  })
  vatAmount: number;

  @ManyToOne(() => CostObjectEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cost_object_id' })
  costObject: CostObjectEntity;

  @ManyToOne(() => InvoiceEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'invoice_id' })
  invoice: InvoiceEntity;

  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;
}
