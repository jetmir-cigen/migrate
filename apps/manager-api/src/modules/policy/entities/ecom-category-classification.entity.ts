import { Column, Entity, Index, OneToMany } from 'typeorm';
import { EcomCategoriesEntity } from './ecom-categories.entity';

@Index('category_classification_id_uindex', ['id'], { unique: true })
@Entity('ecom.category_classification', { schema: 'ecom' })
export class EcomCategoryClassificationEntity {
  @Column('varchar', { primary: true, name: 'id', length: 32 })
  id: string;

  @Column('varchar', { name: 'description', nullable: true, length: 255 })
  description: string | null;

  @OneToMany(
    () => EcomCategoriesEntity,
    (categories) => categories.classification,
  )
  categories: EcomCategoriesEntity[];
}
