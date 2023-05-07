import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Unique,
} from 'typeorm';

@Entity('employee-consent')
export class EmployeeConsentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 10, nullable: true })
  @Unique(['customer_head_id'])
  customerHeadId: string;

  @Column({ type: 'char', length: 10, nullable: true })
  @Unique(['customer_id'])
  customerId: string;

  @Column({ type: 'text', nullable: true })
  text: string;

  @Column({ type: 'char', length: 10, nullable: true })
  @Unique(['created_user_id'])
  createdUserId: string;

  @CreateDateColumn({ name: 'createdDate' })
  created_date: Date;
}
