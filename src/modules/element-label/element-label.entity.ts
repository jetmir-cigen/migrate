import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('element_label')
export class ElementLabelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @Column()
  name: string;

  @Column()
  description: string;
}
