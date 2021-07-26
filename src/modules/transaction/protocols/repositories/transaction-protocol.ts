import { Transaction } from '@/modules/transaction/infrastructure/typeorm/entities/transaction'
import { CreateTransactionDto } from '@/modules/transaction/dtos/create-transaction-dto'

interface TransactionProtocol {
  create: (data: CreateTransactionDto) => Transaction
  save: (data: Transaction) => Promise<Transaction>
}

export { TransactionProtocol }
