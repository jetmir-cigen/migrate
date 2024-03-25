import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
  OneToMany,
} from 'typeorm';

import { InvoiceRowEntity } from './invoice-row.entity';
import { VendorEntity } from './vendor.entity';
import { CustomerEntity } from './customer.entity';
import { ElementLabelEntity } from './element-label.entity';

@Entity({ name: 'control.invoice', schema: 'control' })
@Index('uk_invoices_vendor_id_invoice_no', ['vendorId', 'invoiceNo'], {
  unique: true,
})
export class InvoiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'vendor_id' })
  vendorId: number;

  @ManyToOne(() => VendorEntity)
  @JoinColumn({ name: 'vendor_id' })
  vendor: VendorEntity;

  @Column({ name: 'customer_id' })
  customerId: number;

  @ManyToOne(() => CustomerEntity)
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;

  @Column({ name: 'invoice_no', length: 25 })
  invoiceNo: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ name: 'due_date', type: 'date' })
  dueDate: Date;

  @Column({ type: 'boolean', default: false })
  sent: boolean;

  @Column({ name: 'invoice_account_id', nullable: true })
  invoiceAccountId: number | null;

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

  @Column({ name: 'element_label_id', default: 1 })
  elementLabelId: number;

  @ManyToOne(() => ElementLabelEntity)
  @JoinColumn({ name: 'element_label_id' })
  elementLabel: ElementLabelEntity;

  @Column({ length: 100, nullable: true })
  kidnumber: string | null;

  @Column({
    name: 'vendor_net_amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  vendorNetAmount: number | null;

  @Column({
    name: 'vendor_vat_amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  vendorVatAmount: number | null;

  @Column({
    name: 'vendor_gross_amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  vendorGrossAmount: number | null;

  @Column({ name: 'invoice_file_name', length: 255, nullable: true })
  invoiceFileName: string | null;

  @Column({ name: 'ehf_status', length: 45, nullable: true })
  ehfStatus: string | null;

  @Column({ name: 'invoice_recipient', length: 255, nullable: true })
  invoiceRecipient: string | null;

  @Column({ type: 'datetime', nullable: true })
  created: Date | null;

  @Column({ name: 'created_user_id', nullable: true })
  createdUserId: number | null;

  @Column({ name: 'last_update', type: 'datetime', nullable: true })
  lastUpdate: Date;

  @Column({ name: 'invoice_classification_id' })
  invoiceClassificationId: number;

  @OneToMany(() => InvoiceRowEntity, (invoiceRow) => invoiceRow.invoice)
  rows: InvoiceRowEntity[];
}
