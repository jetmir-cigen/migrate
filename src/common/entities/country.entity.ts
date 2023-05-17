import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'country' })
export class CountryEntity {
  @PrimaryColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ nullable: true })
  default_whitelabl_id: number;

  @Column({ default: 'no' })
  locale: string;

  @Column({ default: 'no' })
  flag: string;

  @Column({ nullable: true })
  currency: string;
}
