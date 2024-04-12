import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Establishments } from './establishments.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  state: string;

  @Column({ nullable: false })
  city: string;

  @Column({
    nullable: false,
  })
  neighborhood: string;

  @Column({
    nullable: false,
  })
  street: string;

  @Column({ nullable: false })
  postal_code: string;

  @Column({ nullable: true })
  number_of_house: number;

  @Column({ nullable: true })
  complement: string;

  @OneToOne(() => Establishments, (establishment) => establishment.address, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  establishment: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
