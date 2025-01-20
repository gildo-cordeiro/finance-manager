import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Dashboard {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.dashboards)
  user: User;

  @Column()
  name: string;

  @Column('jsonb')
  config: object;

  @CreateDateColumn()
  createdAt: Date;
}