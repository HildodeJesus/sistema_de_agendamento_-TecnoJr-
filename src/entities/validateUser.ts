import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ValidateUser {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  code: string;

  @Column({ nullable: false })
  user_email: string;

  @Column({ nullable: false })
  expires: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}
