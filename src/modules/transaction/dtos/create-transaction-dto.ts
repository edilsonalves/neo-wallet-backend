import { Account } from '@/modules/account/infrastructure/typeorm/entities/account'
import { TransactionTypeEnum } from '../enums'

interface CreateTransactionDto {
  type: TransactionTypeEnum
  fakeKey?: string
  barCode?: string
  description?: string
  value: number
  account: Account
}

export { CreateTransactionDto }
