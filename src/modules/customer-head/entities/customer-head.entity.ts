import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customer-heads')
export class CustomerHeadEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'char', length: 20, nullable: false })
  org_no: string;

  @Column({ type: 'int', nullable: false })
  corporate_customer_id: number;

  // entity
  @Column({ type: 'int', nullable: false })
  customer_head_frame_agreement_id: number;
}
