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
import AnimalsVaccines from '../../../../animals/infra/typeorm/entities/AnimalsVaccines';
import { IVaccine } from '@modules/vaccines/domain/models/IVaccine';

@Entity('vaccines')
class Vaccine implements IVaccine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.vaccines)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => AnimalsVaccines, animals_vaccine => animals_vaccine.vaccine)
  animals_vaccine: AnimalsVaccines[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Vaccine;
