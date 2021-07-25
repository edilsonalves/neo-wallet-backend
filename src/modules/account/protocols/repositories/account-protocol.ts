import { Account } from '@/modules/account/infrastructure/typeorm/entities/account'
import { CreateAccountDto } from '@/modules/account/dtos/create-account-dto'

interface AccountProtocol {
  create: (data: CreateAccountDto) => Account
  save: (data: Account) => Promise<Account>
}

export { AccountProtocol }
