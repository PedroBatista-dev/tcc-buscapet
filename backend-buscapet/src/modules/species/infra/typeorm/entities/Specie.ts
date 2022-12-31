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
import Breed from '../../../../breeds/infra/typeorm/entities/Breed';
import { ISpecie } from '@modules/species/domain/models/ISpecie';

@Entity('species')
class Specie implements ISpecie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.species)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Breed, breed => breed.specie, {
    cascade: true,
  })
  breeds: Breed[];

  @OneToMany(() => Animal, animal => animal.specie, {
    cascade: true,
  })
  animals: Animal[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Specie;
