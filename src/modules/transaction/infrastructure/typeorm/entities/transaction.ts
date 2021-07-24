import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import { TransactionTypeEnum, TransactionStatusEnum } from '@/modules/transaction/enums'

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn()
  id: number

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

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

export { Transaction }
