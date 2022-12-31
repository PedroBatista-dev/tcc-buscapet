import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

import Animal from '../../../animals/typeorm/entities/Animal';
import Vaccine from '../../../vaccines/typeorm/entities/Vaccine';
import Color from '../../../colors/typeorm/entities/Color';
import Specie from '../../../species/typeorm/entities/Specie';
import Breed from '../../../breeds/typeorm/entities/Breed';
import Adoption from '../../../adoptions/typeorm/entities/Adoption';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  @Column()
  isOng: boolean;

  @Column()
  cpf: string;

  @Column()
  cnpj: string;

  @OneToMany(() => Vaccine, vaccine => vaccine.user, {
    cascade: true,
  })
  vaccines: Vaccine[];

  @OneToMany(() => Color, color => color.user, {
    cascade: true,
  })
  colors: Color[];

  @OneToMany(() => Specie, specie => specie.user, {
    cascade: true,
  })
  species: Specie[];

  @OneToMany(() => Breed, breed => breed.user, {
    cascade: true,
  })
  breeds: Breed[];

  @OneToMany(() => Animal, animal => animal.user, {
    cascade: true,
  })
  animals: Animal[];

  @OneToMany(() => Adoption, adoption => adoption.ong, {
    cascade: true,
  })
  ong_adoptions: Adoption[];

  @OneToMany(() => Adoption, adoption => adoption.adopter, {
    cascade: true,
  })
  adopter_adoptions: Adoption[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }

    return `${process.env.APP_API_URL}/files/${this.avatar}`;
  }
}

export default User;
