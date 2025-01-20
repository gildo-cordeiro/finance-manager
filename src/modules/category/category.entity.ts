import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { Transaction } from '../transaction/transaction.entity';
import { BaseEntity } from 'src/shared/database/base.entity';

@Entity()
export class Category extends BaseEntity {
  @ManyToOne(() => User, (user) => user.categories)
  user: User;

  @Column()
  name: string;

  @OneToMany(() => Transaction, (transaction) => transaction.category)
  transactions: Transaction[];
}
