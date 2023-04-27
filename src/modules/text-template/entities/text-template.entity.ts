import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'text_template', schema: 'control' })
export class TextTemplateEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'code', nullable: true })
  code: string;

  @Column({ name: 'locale', default: 'no', nullable: true })
  locale: string;

  @Column({ name: 'whitelabel_id', default: 1, nullable: true })
  whitelabelId: number;

  @Column({ name: 'customer_head_id', nullable: true })
  customerHeadId: number;

  @Column({ name: 'customer_id', nullable: true })
  customerId: number;

  @Column('text', { name: 'sender', nullable: true })
  sender: string;

  @Column('text', { name: 'subject', nullable: true })
  subject: string;

  @Column('text', { name: 'text', nullable: true })
  text: string;

  @Column({ name: 'type', default: 'EMAIL', nullable: true })
  type: string;

  @Column('text', { name: 'description', nullable: true })
  description: string;
}
