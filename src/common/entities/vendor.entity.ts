import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'vendor', schema: 'control' })
export class VendorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 12, name: 'org_no' })
  orgNo: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  address1: string | null;

  @Column({ type: 'varchar', length: 45, nullable: true })
  address2: string | null;

  @Column({ type: 'varchar', length: 10, nullable: true })
  zip: string | null;

  @Column({ type: 'varchar', length: 45, nullable: true })
  city: string | null;

  @Column({ type: 'text', nullable: true })
  note: string | null;

  @Column({
    name: 'payment_account_no',
    type: 'varchar',
    length: 45,
    nullable: true,
  })
  paymentAccountNo: string | null;

  @Column({
    name: 'payment_swift_no',
    type: 'varchar',
    length: 45,
    nullable: true,
  })
  paymentSwiftNo: string | null;

  @Column({
    name: 'payment_iban_no',
    type: 'varchar',
    length: 45,
    nullable: true,
  })
  paymentIbanNo: string | null;

  @Column({ name: 'whitelabel_id', nullable: true })
  whitelabelId: number | null;

  @Column({ name: 'country_id', default: 47 })
  countryId: number;

  @Column({ name: 'EhfXsltPath', type: 'varchar', length: 500, nullable: true })
  ehfXsltPath: string | null;

  @Column({ name: 'XsltMaxLineNumPerPage', nullable: true })
  xsltMaxLineNumPerPage: number | null;
}
