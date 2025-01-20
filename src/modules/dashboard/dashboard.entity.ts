import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../modules/user/user.entity';

@Entity()
export class Dashboard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.dashboards)
  user: User;

  @Column()
  name: string;

  @Column('jsonb')
  config: object;

  @CreateDateColumn()
  createdAt: Date;
}