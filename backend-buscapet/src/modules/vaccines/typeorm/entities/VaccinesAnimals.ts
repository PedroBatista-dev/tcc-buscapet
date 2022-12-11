import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Animal from '../../../animals/typeorm/entities/Animal';
import Vaccine from './Vaccine';

@Entity('vaccines_animals')
class VaccinesAnimals {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Vaccine, vaccine => vaccine.vaccine_animals)
  @JoinColumn({ name: 'vaccine_id' })
  vaccine: Vaccine;

  @ManyToOne(() => Animal, animal => animal.vaccine_animals)
  @JoinColumn({ name: 'animal_id' })
  animal: Animal;

  @Column()
  vaccine_id: string;

  @Column()
  animal_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default VaccinesAnimals;
