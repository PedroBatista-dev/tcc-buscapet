import User from '../../../users/typeorm/entities/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('quiz')
class Quiz {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  birth_date: Date;

  @Column()
  marital_status: string;

  @Column()
  professional_activity: string;

  @Column()
  address: string;

  @Column()
  complement: string;

  @Column()
  district: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  cep: string;

  @Column()
  profile_instragam: string;

  @Column()
  for_who: string;

  @Column()
  why_adopt: string;

  @Column()
  average_life: boolean;

  @Column()
  financial_conditions: boolean;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.colors)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Quiz;
