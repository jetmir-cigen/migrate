import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CountryEntity } from './country.entity';
import { SmsGroupEntity } from './sms-group.entity';

@Entity({ schema: 'control', name: 'control.sms_group_number' })
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
