import { Account } from '@/modules/account/infrastructure/typeorm/entities/account'
import { TransactionTypeEnum } from '../enums'

interface CreateTransactionDto {
  type: TransactionTypeEnum
  value: number
  account: Account
}

export { CreateTransactionDto }
