import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Categories } from './categories.entity';
import { Schedules } from './schedules.entity';
import { Address } from './address.entity';
import { Users } from './users.entity';
import { Roles } from './roles.entity';

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

  @OneToOne(() => Address, (address) => address.establishment, {
    onDelete: 'CASCADE',
  })
  address: Address;

  @ManyToMany(() => Categories, (category) => category.establishments, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  categories: Categories[];

  @OneToMany(() => Schedules, (schedule) => schedule.user, {
    onDelete: 'CASCADE',
  })
  schedules: Schedules[];

  @ManyToOne(() => Users, (user) => user.establishment, { onDelete: 'CASCADE' })
  user: Users;

  @ManyToOne(() => Roles, (roles) => roles.establishment)
  roles: Roles[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
