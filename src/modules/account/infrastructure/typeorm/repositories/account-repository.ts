import { Repository, getRepository } from 'typeorm'

import { Account } from '../entities/account'
import { AccountProtocol } from '@/modules/account/protocols/repositories/account-protocol'
import { CreateAccountDto } from '@/modules/account/dtos/create-account-dto'

class AccountRepository implements AccountProtocol {
  constructor (private readonly ormRepository: Repository<Account> = getRepository(Account)) {}

  public create (data: CreateAccountDto): Account {
    const account = this.ormRepository.create(data)

    return account
  }

  public async save (data: Account): Promise<Account> {
    const account = await this.ormRepository.save(data)

    return account
  }

  public async findById (id: string): Promise<Account | undefined> {
    const account = await this.ormRepository.findOne(id)

    return account
  }
}

export { AccountRepository }
