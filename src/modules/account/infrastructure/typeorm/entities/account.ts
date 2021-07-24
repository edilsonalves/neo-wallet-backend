import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

import { User } from '@/modules/user/infrastructure/typeorm/entities/user'
import { Transaction } from '@/modules/transaction/infrastructure/typeorm/entities/transaction'

@Entity('accounts')
class Account {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  agency: string

  @Column()
  number: string

  @Column()
  balance: string

  @Column()
  income: string

  @OneToOne(() => User, user => user.account)
  user: User

  @OneToMany(() => Transaction, transaction => transaction.account)
  transactions: Transaction[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

export { Account }
