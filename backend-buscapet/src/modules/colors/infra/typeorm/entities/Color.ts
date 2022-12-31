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
import Animal from '../../../../animals/infra/typeorm/entities/Animal';
import { IColor } from '@modules/colors/domain/models/IColor';

@Entity('colors')
class Color implements IColor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.colors)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Animal, animal => animal.color, {
    cascade: true,
  })
  animals: Animal[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Color;
