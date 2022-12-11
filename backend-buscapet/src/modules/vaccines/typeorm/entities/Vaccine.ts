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
import VaccinesAnimals from './VaccinesAnimals';

@Entity('vaccines')
class Vaccine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.vaccines)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(
    () => VaccinesAnimals,
    vaccine_animals => vaccine_animals.vaccine,
    {
      cascade: true,
    },
  )
  vaccine_animals: VaccinesAnimals[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Vaccine;
