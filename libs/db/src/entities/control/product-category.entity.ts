import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'control.product_category' })
export class ProductCategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45 })
  name: string;
}
