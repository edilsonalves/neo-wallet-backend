import { Repository, getRepository, EntityManager } from 'typeorm'

import { Account } from '../entities/account'
import { AccountProtocol } from '@/modules/user/protocols/repositories/account-protocol'
import { CreateAccountDto } from '@/modules/user/dtos/create-account-dto'

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

  public async saveTransaction (data: Account, entityManager: EntityManager): Promise<Account> {
    const account = await entityManager.save(data)

    return account
  }

  public async findById (id: string): Promise<Account | undefined> {
    const account = await this.ormRepository.findOne(id)

    return account
  }

  public async findByFakeKey (fakeKey: string): Promise<Account | undefined> {
    const account = await this.ormRepository.findOne({ where: { fakeKey } })

    return account
  }
}

export { AccountRepository }
