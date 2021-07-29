import { injectable, inject } from 'tsyringe'

import { AppError } from '@/shared/errors/app-error'
import { Transaction } from '../infrastructure/typeorm/entities/transaction'
import { TransactionProtocol } from '../protocols/repositories/transaction-protocol'
import { UserProtocol } from '@/modules/user/protocols/repositories/user-protocol'
import { isValidId } from '@/shared/utils'

interface Request {
  userId: string
}

@injectable()
class ShowTransactionsService {
  constructor (
    @inject('TransactionRepository')
    private readonly transactionRepository: TransactionProtocol,

    @inject('UserRepository')
    private readonly userRepository: UserProtocol
  ) {}

  public async execute ({ userId }: Request): Promise<Transaction[]> {
    if (!isValidId(userId)) {
      throw new AppError('Usuário não identificado', 404)
    }

    const user = await this.userRepository.findById(userId)

    if (user === undefined) {
      throw new AppError('Usuário não identificado', 404)
    }

    const transactions = await this.transactionRepository.findByAccountId(
      user.account.id
    )

    return transactions
  }
}

export { ShowTransactionsService }
