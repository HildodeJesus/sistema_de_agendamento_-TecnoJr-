import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Categories } from './categories.entity';
import { Schedules } from './schedules.entity';

@Entity()
export class Establishments {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column('text', {
    nullable: true,
  })
  description: string;

  @Column({ length: 11 })
  number_phone: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  is_open: string;

  @Column({ nullable: true })
  is_close: string;

  @ManyToMany(() => Categories, { cascade: false })
  @JoinTable()
  categories: Categories[];

  @OneToMany(() => Schedules, (schedule) => schedule.user)
  schedules: Schedules[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
