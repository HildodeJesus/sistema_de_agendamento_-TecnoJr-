import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class AccountActivationCode {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  code: string;

  @Column({ nullable: false })
  expires: number;

  @OneToOne(() => Users, { cascade: true })
  @JoinColumn()
  user: Users;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}
