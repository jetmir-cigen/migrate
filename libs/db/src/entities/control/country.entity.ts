import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'control.country' })
export class CountryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', length: 255 })
  name: string;

  @Column({ name: 'default_whitelabl_id', nullable: true })
  defaultWhiteLabelId: number;

  @Column({ name: 'locale', default: 'no' })
  locale: string;

  @Column({ name: 'flag', default: 'no' })
  flag: string;

  @Column({ name: 'currency', nullable: true })
  currency: string;
}
