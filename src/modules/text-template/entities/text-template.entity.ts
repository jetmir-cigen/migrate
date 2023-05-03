import { CustomerHeadEntity } from '@/common/entities/customer-head.entity';
import { WhiteLabelEntity } from '@/modules/whitelabel/entities/whitelabel.entity';
import { CustomerEntity } from '@/modules/customer/entities/customer.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'text_template', schema: 'control' })
export class TextTemplateEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'code', nullable: true })
  code: string;

  @Column({ name: 'locale', default: 'no', nullable: true })
  locale: string;

  @ManyToOne(() => WhiteLabelEntity)
  @JoinColumn({ name: 'whitelabel_id' })
  whitelabel: WhiteLabelEntity;

  @ManyToOne(() => CustomerHeadEntity)
  @JoinColumn({ name: 'customer_head_id' })
  customerHead: CustomerHeadEntity;

  @ManyToOne(() => CustomerEntity)
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;

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
