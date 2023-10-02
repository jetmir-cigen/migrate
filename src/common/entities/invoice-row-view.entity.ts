import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CustomerViewEntity } from './customer-view.entity';

@Entity({ schema: 'view', name: 'invoice_row' })
export class InvoiceRowViewEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'amount' })
  amount: number;

  @Column({ name: 'salary_deduction_amount' })
  salaryDeductionAmount: number;

  @Column({ name: 'quantity' })
  quantity: number;

  @Column({ name: 'from_period' })
  fromPeriod: string;

  @Column({ name: 'to_period' })
  toPeriod: string;

  @Column({ name: 'peak_volume' })
  peakVolume: number;

  @Column({ name: 'off_peak_volume' })
  offPeakVolume: number;

  @Column({ name: 'text' })
  text: string;

  @Column({ name: 'product_id' })
  productId: number;

  @Column({ name: 'product_name' })
  productName: string;

  @Column({ name: 'price_type' })
  priceType: string;

  @Column({ name: 'product_group_id' })
  productGroupId: number;

  @Column({ name: 'product_group_name' })
  productGroupName: string;

  @Column({ name: 'product_category_id' })
  productCategoryId: number;

  @Column({ name: 'product_category_name' })
  productCategoryName: string;

  @Column({ name: 'cost_object_id' })
  costObjectId: number;

  @Column({ name: 'cost_object_name' })
  costObjectName: string;

  @Column({ name: 'cost_object_type' })
  costObjectType: string;

  @Column({ name: 'date' })
  date: Date;

  @Column({ name: 'vendor_id' })
  vendorId: number;

  @Column({ name: 'customer_id' })
  customerId: number;

  @Column({ name: 'customer_name' })
  customerName: string;

  @Column({ name: 'customer_head_id' })
  customerHeadId: number;

  @Column({ name: 'customer_head_name' })
  customerHeadName: string;

  @Column({ name: 'customer_head_frame_agreement_id' })
  customerHeadFrameAgreementId: number;

  @Column({ name: 'customer_head_frame_agreement_name' })
  customerHeadFrameAgreementName: string;

  @ManyToOne(() => CustomerViewEntity, (customer) => customer.invoiceRows)
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerViewEntity;
}
