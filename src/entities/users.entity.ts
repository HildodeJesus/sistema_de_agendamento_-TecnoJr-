import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Schedules } from './schedules.entity';
import { Establishments } from './establishments.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'off' })
  role: string;

  @Column({ default: false })
  isActivated: boolean;

  @OneToMany(() => Schedules, (schedule) => schedule.user, { cascade: true })
  schedules: Schedules[];

  @OneToMany(() => Establishments, (establishment) => establishment.user)
  establishment: Establishments;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
