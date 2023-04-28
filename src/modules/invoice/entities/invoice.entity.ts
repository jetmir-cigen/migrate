import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { CustomerEntity } from '@/modules/customer/entities/customer.entity';
import { ElementLabelEntity } from '@/modules/element-label/element-label.entity';

@Entity({ name: 'invoice', schema: 'control' })
export class InvoiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'vendor_id' })
  vendorId: number;

  @ManyToOne(() => CustomerEntity)
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;

  @Column({ name: 'invoice_no', length: 25 })
  @Index('uk_invoices_vendor_id_invoice_no', { unique: true })
  invoiceNo: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ name: 'due_date', type: 'date' })
  dueDate: Date;

  @Column({ type: 'boolean', default: false })
  sent: boolean;

  @Column({ name: 'invoice_account_id' })
  invoiceAccountId: number;

  @Column({
    name: 'invoice_amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  invoiceAmount: number;

  @Column({
    name: 'invoice_control_amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  invoiceControlAmount: number;

  @ManyToOne(() => ElementLabelEntity, { nullable: false })
  @JoinColumn({ name: 'element_label_id' })
  elementLabel: ElementLabelEntity;

  @Column({ length: 100, nullable: true })
  kidnumber: string;

  @Column({
    name: 'vendor_net_amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  vendorNetAmount: number;

  @Column({
    name: 'vendor_vat_amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  vendorVatAmount: number;

  @Column({
    name: 'vendor_gross_amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  vendorGrossAmount: number;

  @Column({ name: 'invoice_file_name', length: 255, nullable: true })
  invoiceFileName: string;

  @Column({ name: 'ehf_status', length: 45, nullable: true })
  ehfStatus: string;

  @Column({ name: 'invoice_recipient', length: 255, nullable: true })
  invoiceRecipient: string;

  @Column({ type: 'datetime', nullable: true })
  created: Date;

  @Column({ name: 'created_user_id', nullable: true })
  createdUserId: number;

  @Column({ name: 'last_update', type: 'datetime', nullable: true })
  lastUpdate: Date;

  @Column({ name: 'invoice_classification_id' })
  invoiceClassificationId: number;
}
