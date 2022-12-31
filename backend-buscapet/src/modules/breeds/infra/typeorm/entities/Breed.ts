import User from '../../../../users/infra/typeorm/entities/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Animal from '../../../../animals/infra/typeorm/entities/Animal';
import Specie from '../../../../species/infra/typeorm/entities/Specie';
import { IBreed } from '@modules/breeds/domain/models/IBreed';

@Entity('breeds')
class Breed implements IBreed {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  specie_id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.breeds)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Specie, specie => specie.breeds)
  @JoinColumn({ name: 'specie_id' })
  specie: Specie;

  @OneToMany(() => Animal, animal => animal.breed, {
    cascade: true,
  })
  animals: Animal[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Breed;
