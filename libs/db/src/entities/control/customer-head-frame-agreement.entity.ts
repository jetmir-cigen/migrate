import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { CustomerHeadEntity } from './customer-head.entity';

@Entity({ schema: 'control', name: 'control.customer_head_frame_agreement' })
export class CustomerHeadFrameAgreementEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ name: 'created', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @OneToMany(
    () => CustomerHeadEntity,
    (customerHead) => customerHead.customerHeadFrameAgreement,
  )
  customerHeads: CustomerHeadEntity[];
}
