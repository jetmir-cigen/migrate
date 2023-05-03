import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'control', name: 'whitelabel' })
export class WhiteLabelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', nullable: true })
  name: string;

  @Column({ name: 'org_nr', nullable: true })
  orgNr: string;

  @Column({ name: 'Address', nullable: true })
  address: string;

  @Column({ nullable: true })
  zip: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  country: string;

  @Column({ name: 'account_no', nullable: true })
  accountNo: string;

  @Column({ name: 'logo_lg', nullable: true })
  logoLg: string;

  @Column({ name: 'logo_sm', nullable: true })
  logoSm: string;

  @Column({ name: 'pdf_template', nullable: true })
  pdfTemplate: string;

  @Column({ name: 'mail_usr_template', nullable: true })
  mailUsrTemplate: string;

  @Column({ name: 'mail_dep_template', nullable: true })
  mailDepTemplate: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ name: 'mailadr', nullable: true })
  mailAdr: string;

  @Column({ nullable: true })
  url: string;

  @Column({ name: 'swift_no', nullable: true })
  swiftNo: string;

  @Column({ name: 'iban_no', nullable: true })
  ibanNo: string;

  @Column({ name: 'address2', nullable: true })
  address2: string;

  @Column({ name: 'color_bg_main', nullable: true })
  colorBgMain: string;

  @Column({ name: 'color_bg_sub', nullable: true })
  colorBgSub: string;

  @Column({ name: 'color_font_main_head', nullable: true })
  colorFontMainHead: string;

  @Column({ name: 'color_border_main', nullable: true })
  colorBorderMain: string;

  @Column({ name: 'BillingCustomer', default: 1 })
  billingCustomer: number;

  @Column({ name: 'gdpr_disclosure_pdf_template', nullable: true })
  gdprDisclosurePdfTemplate: string;

  @Column({ name: 'gdpr_disclosure_email_subject', nullable: true })
  gdprDisclosureEmailSubject: string;

  @Column({ name: 'gdpr_disclosure_email_template', nullable: true })
  gdprDisclosureEmailTemplate: string;
}
