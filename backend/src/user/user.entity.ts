import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  emailHash: string;

  @Column()
  signature: string;

  @Column()
  role: string;

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
