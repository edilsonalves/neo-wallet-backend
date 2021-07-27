import { EntityManager } from 'typeorm'

import { Account } from '@/modules/account/infrastructure/typeorm/entities/account'
import { CreateAccountDto } from '@/modules/account/dtos/create-account-dto'

interface AccountProtocol {
  create: (data: CreateAccountDto) => Account
  save: (data: Account) => Promise<Account>
  saveTransaction: (data: Account, entityManager: EntityManager) => Promise<Account>
  findById: (id: string) => Promise<Account | undefined>
  findByFakeKey: (fakeKey: string) => Promise<Account | undefined>
}

export { AccountProtocol }
