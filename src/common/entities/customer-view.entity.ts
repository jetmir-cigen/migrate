import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { InvoiceRowViewEntity } from './invoice-row-view.entity';

@Entity({ schema: 'view', name: 'customer' })
export class CustomerViewEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'status' })
  status: string;

  @Column({ name: 'org_no' })
  orgNo: string;

  @Column({ name: 'address1' })
  address1: string;

  @Column({ name: 'address2' })
  address2: string;

  @Column({ name: 'zip' })
  zip: string;

  @Column({ name: 'city' })
  city: string;

  @Column({ name: 'billing_address1' })
  billingAddress1: string;

  @Column({ name: 'billing_address2' })
  billingAddress2: string;

  @Column({ name: 'billing_zip' })
  billingZip: string;

  @Column({ name: 'billing_city' })
  billingCity: string;

  @Column({ name: 'locale' })
  locale: string;

  @Column({ name: 'whitelabel_id' })
  whitelabelId: number;

  @Column({ name: 'whitelabel_name' })
  whitelabelName: string;

  @Column({ name: 'customer_head_id' })
  customerHeadId: number;

  @Column({ name: 'customer_head_name' })
  customerHeadName: string;

  @Column({ name: 'head_customer_id' })
  headCustomerId: number;

  @Column({ name: 'customer_head_frame_agreement_id' })
  customerHeadFrameAgreementId: number;

  @Column({ name: 'customer_head_frame_agreement_name' })
  customerHeadFrameAgreementName: string;

  @Column({ name: 'currency' })
  currency: string;

  @OneToMany(() => InvoiceRowViewEntity, (invoiceRow) => invoiceRow.customer)
  invoiceRows: InvoiceRowViewEntity[];
}
