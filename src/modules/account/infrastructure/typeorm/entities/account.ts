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
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  agency: string

  @Column()
  number: string

  @Column({ default: 0 })
  balance: number

  @Column({ default: 0 })
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
