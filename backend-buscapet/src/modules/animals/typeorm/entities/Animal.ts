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
import Color from '../../../colors/typeorm/entities/Color';
import Specie from '../../../species/typeorm/entities/Specie';
import Breed from '../../../breeds/typeorm/entities/Breed';
import VaccinesAnimals from '../../../vaccines/typeorm/entities/VaccinesAnimals';

@Entity('animals')
class Animal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('int')
  age: number;

  @Column()
  sex: string;

  @Column()
  size: string;

  @Column()
  status: string;

  @Column()
  other_animals: string;

  @Column()
  avatar: string;

  @Column()
  color_id: string;

  @Column()
  breed_id: string;

  @Column()
  specie_id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => Color, color => color.animals)
  @JoinColumn({ name: 'color_id' })
  color: Color;

  @ManyToOne(() => Specie, specie => specie.animals)
  @JoinColumn({ name: 'specie_id' })
  specie: Specie;

  @ManyToOne(() => Breed, breed => breed.animals)
  @JoinColumn({ name: 'breed_id' })
  breed: Breed;

  @OneToMany(() => VaccinesAnimals, vaccine_animals => vaccine_animals.animal)
  vaccine_animals: VaccinesAnimals[];

  @ManyToOne(() => User, user => user.animals)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Animal;
