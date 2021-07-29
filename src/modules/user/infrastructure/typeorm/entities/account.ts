import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

import { User } from './user'
import { Transaction } from '@/modules/transaction/infrastructure/typeorm/entities/transaction'

@Entity('accounts')
class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string

  // Simulates a Pix key
  @Column()
  fakeKey: string

  @Column({ type: 'float', default: 0.00 })
  balance: number

  @Column({ type: 'float', default: 0.00 })
  income: number

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
