import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SmsGroupEntity } from './sms-group.entity';
import { CountryEntity } from '@/common/entities/country.entity';

@Entity({ schema: 'control', name: 'sms_group_number' })
export class SmsGroupNumberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'group_id' })
  groupId: number;

  @ManyToOne(() => SmsGroupEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'group_id' })
  group: SmsGroupEntity;

  @Column({ name: 'country_id', nullable: true })
  countryId: number;

  @ManyToOne(() => CountryEntity, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'country_id' })
  country: CountryEntity;

  @Column()
  number: string;

  @Column()
  name: string;
}
