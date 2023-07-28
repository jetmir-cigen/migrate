import { CostObjectEntity } from '@/common/entities/cost-object.entity';
import { CountryEntity } from '@/common/entities/country.entity';
import { UserEntity } from '@/modules/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ schema: 'control', name: 'sms_phone_book' })
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
