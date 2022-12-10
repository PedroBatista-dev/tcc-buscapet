import Animal from '../../../animals/typeorm/entities/Animal';
import Vaccine from '../../../vaccines/typeorm/entities/Vaccine';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Color from '../../../colors/typeorm/entities/Color';
import Specie from '../../../species/typeorm/entities/Specie';
import Breed from '../../../breeds/typeorm/entities/Breed';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @Column()
  profile: string;

  @Column()
  document: string;

  @OneToMany(() => Vaccine, vaccine => vaccine.vaccine, {
    cascade: true,
  })
  vaccines: Vaccine[];

  @OneToMany(() => Color, color => color.color, {
    cascade: true,
  })
  colors: Color[];

  @OneToMany(() => Specie, specie => specie.specie, {
    cascade: true,
  })
  species: Specie[];

  @OneToMany(() => Breed, breed => breed.breed, {
    cascade: true,
  })
  breeds: Breed[];

  @OneToMany(() => Animal, animal => animal.animal, {
    cascade: true,
  })
  animals: Animal[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
