import { EntityManager } from 'typeorm'

import { Transaction } from '@/modules/transaction/infrastructure/typeorm/entities/transaction'
import { CreateTransactionDto } from '@/modules/transaction/dtos/create-transaction-dto'

interface TransactionProtocol {
  create: (data: CreateTransactionDto) => Transaction
  save: (data: Transaction) => Promise<Transaction>
  saveTransaction: (data: Transaction, entityManager: EntityManager) => Promise<Transaction>
  findByBarCode: (barCode: string) => Promise<Transaction | undefined>
}

export { TransactionProtocol }
