import { injectable, inject } from 'tsyringe'

import { AppError } from '@/shared/errors/app-error'
import { Account } from '../infrastructure/typeorm/entities/account'
import { AccountProtocol } from '../protocols/repositories/account-protocol'
import { UserProtocol } from '@/modules/user/protocols/repositories/user-protocol'
import { fakeAccountGenerator } from '../utils'
import { isValidId } from '@/shared/utils'

interface Request {
  userId: string
}

@injectable()
class CreateAccountService {
  constructor (
    @inject('AccountRepository')
    private readonly accountRepository: AccountProtocol,

    @inject('UserRepository')
    private readonly userRepository: UserProtocol
  ) {}

  public async execute ({ userId }: Request): Promise<Account> {
    if (!isValidId(userId)) {
      throw new AppError('Usuário não identificado', 404)
    }

    const user = await this.userRepository.findById(userId)

    if (user === undefined) {
      throw new AppError('Usuário não identificado', 404)
    }

    if (user.account !== null) {
      throw new AppError('O usuário já possui uma conta', 403)
    }

    const fakeKey = fakeAccountGenerator()
    const account = this.accountRepository.create({ fakeKey, user })

    await this.accountRepository.save(account)

    return account
  }
}

export { CreateAccountService }
