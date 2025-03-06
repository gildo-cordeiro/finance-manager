import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Category } from '../category/category.entity';
import { Transaction } from '../transaction/transaction.entity';
import { Dashboard } from '../dashboard/dashboard.entity';
import { BaseEntity } from '../../shared/database/base.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Category, (category) => category.user)
  categories: Category[];

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];

  @OneToMany(() => Dashboard, (dashboard) => dashboard.user)
  dashboards: Dashboard[];

  initialize(partial: Partial<User>) {
    Object.assign(this, partial);
    this.categories = this.categories || [];
    this.transactions = this.transactions || [];
    this.dashboards = this.dashboards || [];
  }
}
