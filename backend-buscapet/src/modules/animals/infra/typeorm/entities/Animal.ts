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
import Color from '../../../../colors/infra/typeorm/entities/Color';
import Specie from '../../../../species/infra/typeorm/entities/Specie';
import Breed from '../../../../breeds/infra/typeorm/entities/Breed';
import Adoption from '../../../../adoptions/infra/typeorm/entities/Adoption';
import AnimalsVaccines from './AnimalsVaccines';
import { IAnimal } from '@modules/animals/domain/models/IAnimal';
import { Expose } from 'class-transformer';

@Entity('animals')
class Animal implements IAnimal {
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

  @OneToMany(() => AnimalsVaccines, animals_vaccine => animals_vaccine.animal, {
    cascade: true,
  })
  animals_vaccine: AnimalsVaccines[];

  @OneToMany(() => Adoption, adoption => adoption.animal)
  adoption: Adoption[];

  @ManyToOne(() => User, user => user.animals)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }

    return `${process.env.APP_API_URL}/${this.avatar}`;
  }
}

export default Animal;
