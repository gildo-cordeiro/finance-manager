import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../modules/user/user.entity';
import { BaseEntity } from '../../shared/database/base.entity';

@Entity()
export class Dashboard extends BaseEntity {
  @ManyToOne(() => User, (user) => user.dashboards)
  user: User;

  @Column()
  name: string;

  @Column('jsonb')
  config: object;
}
