import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './users.entity';
import { Establishments } from './establishments.entity';

@Entity()
export class Schedules {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('datetime', { nullable: false })
  is_started: Date;

  @Column('datetime', { nullable: false })
  is_finished: Date;

  @ManyToOne(() => Establishments, (establishment) => establishment.schedules, {
    cascade: true,
  })
  establishment: Establishments;

  @ManyToOne(() => Users, (user) => user.schedules, {
    cascade: true,
  })
  user: Users;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
