import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { UserEntity } from './user.entity';
import { CountryEntity } from './country.entity';
import { CostObjectEntity } from './cost-object.entity';

@Entity({ schema: 'control', name: 'control.sms_phone_book' })
export class SmsPhoneBookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'country_id', default: '47' })
  countryId: number;

  @ManyToOne(() => CountryEntity, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'country_id' })
  country: CountryEntity;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @ManyToOne(() => CostObjectEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'phone_number', referencedColumnName: 'code' })
  costObject: CostObjectEntity;

  @Column()
  name: string;
}
