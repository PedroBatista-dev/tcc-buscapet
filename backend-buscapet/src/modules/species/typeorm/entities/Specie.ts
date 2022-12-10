import User from '../../../users/typeorm/entities/User';
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
import Animal from '../../../animals/typeorm/entities/Animal';
import Breed from '../../../breeds/typeorm/entities/Breed';

@Entity('species')
class Specie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.species)
  @JoinColumn({ name: 'user_id' })
  specie: Specie;

  @OneToMany(() => Breed, breed => breed.specie, {
    cascade: true,
  })
  breeds: Breed[];

  @OneToMany(() => Animal, animal => animal.animal_specie, {
    cascade: true,
  })
  animals: Animal[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Specie;
