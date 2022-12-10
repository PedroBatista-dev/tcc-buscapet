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
import Specie from '../../../species/typeorm/entities/Specie';

@Entity('breeds')
class Breed {
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
  breed: Breed;

  @ManyToOne(() => Specie, specie => specie.breeds)
  @JoinColumn({ name: 'specie_id' })
  specie: Specie;

  @OneToMany(() => Animal, animal => animal.animal_breed, {
    cascade: true,
  })
  animals: Animal[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Breed;
