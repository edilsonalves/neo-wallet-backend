import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import { Account } from '@/modules/account/infrastructure/typeorm/entities/account'
import { TransactionTypeEnum, TransactionStatusEnum } from '@/modules/transaction/enums'

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'enum',
    enum: TransactionTypeEnum
  })
  type: TransactionTypeEnum

  @Column({
    type: 'enum',
    enum: TransactionStatusEnum
  })
  status: TransactionStatusEnum

  @Column()
  value: number

  @ManyToOne(() => Account, account => account.transactions)
  account: Account

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

export { Transaction }
