import { User } from '@/modules/user/infrastructure/typeorm/entities/user'

interface CreateAccountDto {
  fakeKey: string
  balance?: number
  income?: number
  user: User
}

export { CreateAccountDto }
