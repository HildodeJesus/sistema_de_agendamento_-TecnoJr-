import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Establishments } from './establishments.entity';

@Entity()
export class Schedules {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('datetime', { nullable: false })
  is_started: Date;

  @Column('datetime', { nullable: false })
  is_finished: Date;

  @ManyToOne(() => Establishments, (establishment) => establishment.schedules)
  establishment: Establishments;

  @ManyToOne(() => User, (user) => user.schedules)
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
