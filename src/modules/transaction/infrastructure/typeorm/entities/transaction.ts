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
    enum: TransactionStatusEnum,
    default: TransactionStatusEnum.SUCCESS
  })
  status: TransactionStatusEnum

  @Column({ nullable: true })
  fakeKey: string

  @Column({ nullable: true })
  barCode: string

  @Column({ nullable: true })
  description: string

  @Column({ type: 'float' })
  value: number

  @ManyToOne(() => Account, account => account.transactions)
  account: Account

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

export { Transaction }
