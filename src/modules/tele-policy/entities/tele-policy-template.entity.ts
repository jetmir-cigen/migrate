import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  schema: 'control',
  name: 'control.tele_policy_template',
})
export class TelePolicyTemplateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', length: 255 })
  name: string;
}
