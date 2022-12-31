import User from '../../../../users/infra/typeorm/entities/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Animal from '../../../../animals/infra/typeorm/entities/Animal';
import { IAdoption } from '@modules/adoptions/domain/models/IAdoption';

@Entity('adoptions')
class Adoption implements IAdoption {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  status: string;

  @Column()
  animal_id: string;

  @Column()
  ong_id: string;

  @Column()
  adopter_id: string;

  @ManyToOne(() => User, user => user.ong_adoptions)
  @JoinColumn({ name: 'ong_id' })
  ong: User;

  @ManyToOne(() => User, user => user.adopter_adoptions)
  @JoinColumn({ name: 'adopter_id' })
  adopter: User;

  @ManyToOne(() => Animal, animal => animal.adoption)
  @JoinColumn({ name: 'animal_id' })
  animal: Animal;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Adoption;
