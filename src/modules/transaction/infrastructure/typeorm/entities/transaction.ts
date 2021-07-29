import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

import { TransactionTypeEnum, TransactionStatusEnum } from '@/modules/transaction/enums'
import { Account } from '@/modules/user/infrastructure/typeorm/entities/account'

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

  @Column()
  accountId: string

  @ManyToOne(() => Account, account => account.transactions)
  @JoinColumn({ name: 'accountId' })
  account: Account

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

export { Transaction }
