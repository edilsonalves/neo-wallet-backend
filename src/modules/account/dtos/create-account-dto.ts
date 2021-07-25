import { User } from '@/modules/user/infrastructure/typeorm/entities/user'

interface CreateAccountDto {
  agency: string
  number: string
  balance?: number
  income?: number
  user: User
}

export { CreateAccountDto }
