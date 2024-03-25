import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { UserEntity } from './user.entity';

@Entity('control.usergroup')
export class UserGroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => UserEntity, (user) => user.userGroup, { nullable: true })
  users: UserEntity[];
}
