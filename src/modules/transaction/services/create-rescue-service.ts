import { injectable, inject } from 'tsyringe'
import { getConnection } from 'typeorm'

import { AppError } from '@/shared/errors/app-error'
import { CurrencyProtocol } from '@/shared/containers/providers/currency-provider/protocols/currency-protocol'
import { Transaction } from '../infrastructure/typeorm/entities/transaction'
import { TransactionProtocol } from '../protocols/repositories/transaction-protocol'
import { TransactionTypeEnum } from '../enums'
import { UserProtocol } from '@/modules/user/protocols/repositories/user-protocol'
import { AccountProtocol } from '@/modules/account/protocols/repositories/account-protocol'
import { isValidId } from '@/shared/utils'

interface Request {
  userId: string
  accountId: string
  value: number
}

@injectable()
class CreateRescueService {
  constructor (
    @inject('CurrencyJsProvider')
    private readonly currencyJsProvider: CurrencyProtocol,

    @inject('TransactionRepository')
    private readonly transactionRepository: TransactionProtocol,

    @inject('UserRepository')
    private readonly userRepository: UserProtocol,

    @inject('AccountRepository')
    private readonly accountRepository: AccountProtocol
  ) {}

  public async execute ({ userId, accountId, value }: Request): Promise<Transaction | undefined> {
    if (!isValidId(userId)) {
      throw new AppError('Usuário não identificado', 404)
    }

    if (!isValidId(accountId)) {
      throw new AppError('Conta não identificada', 404)
    }

    const [user, account] = await Promise.all([
      this.userRepository.findById(userId),
      this.accountRepository.findById(accountId)
    ])

    if (user === undefined) {
      throw new AppError('Usuário não identificado', 404)
    }

    if (account === undefined) {
      throw new AppError('Conta não identificada', 404)
    }

    const rescueValue = this.currencyJsProvider.getValue(value)
    const balanceValue = this.currencyJsProvider.getValue(account.balance)

    if (rescueValue <= 0.00) {
      throw new AppError('Valor não permitido', 406)
    }

    if (this.currencyJsProvider.subtract([balanceValue, rescueValue]) < 0.00) {
      throw new AppError('Saldo insuficiente', 200)
    }

    let transaction: Transaction | undefined

    await getConnection().transaction(async entityManager => {
      account.balance = this.currencyJsProvider.subtract([balanceValue, rescueValue])
      await this.accountRepository.saveTransaction(account, entityManager)

      transaction = this.transactionRepository.create({
        type: TransactionTypeEnum.RESCUE,
        fakeKey: account.fakeKey,
        value: rescueValue,
        account
      })

      await this.transactionRepository.saveTransaction(transaction, entityManager)
    })

    return transaction
  }
}

export { CreateRescueService }
