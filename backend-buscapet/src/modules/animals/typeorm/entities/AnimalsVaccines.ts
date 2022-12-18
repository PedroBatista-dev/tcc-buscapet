import Vaccine from '../../../vaccines/typeorm/entities/Vaccine';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Animal from './Animal';

@Entity('animals_vaccines')
class AnimalsVaccines {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  vaccine_id: string;

  @Column()
  animal_id: string;

  @ManyToOne(() => Vaccine, vaccine => vaccine.animals_vaccine)
  @JoinColumn({ name: 'vaccine_id' })
  vaccine: Vaccine;

  @ManyToOne(() => Animal, animal => animal.animals_vaccine)
  @JoinColumn({ name: 'animal_id' })
  animal: Animal;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default AnimalsVaccines;
