import { injectable, inject } from 'tsyringe'

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
  type: string
  value: number
}

@injectable()
class CreateTransactionService {
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

  public async execute ({
    userId,
    accountId,
    type,
    value
  }: Request): Promise<Transaction> {
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

    const currencyValue = this.currencyJsProvider.getValue(value)

    if (currencyValue <= 0.00) {
      throw new AppError('Valor não permitido', 406)
    }

    const typeEnum = TransactionTypeEnum[
      type.toUpperCase() as keyof typeof TransactionTypeEnum
    ]

    if (typeEnum === undefined) {
      throw new AppError('Tipo de transação inválido', 404)
    }

    const balanceValue = this.currencyJsProvider.getValue(account.balance)

    switch (typeEnum) {
      case TransactionTypeEnum.RESCUE:
      case TransactionTypeEnum.PAYMENT:
        if (this.currencyJsProvider.subtract([balanceValue, currencyValue]) >= 0) {
          account.balance = this.currencyJsProvider.subtract([balanceValue, currencyValue])
        } else {
          throw new AppError('Saldo insuficiente', 200)
        }
        break
      default:
        account.balance = this.currencyJsProvider.add([balanceValue, currencyValue])
        break
    }

    await this.accountRepository.save(account)

    const transaction = this.transactionRepository.create({
      type: typeEnum,
      value,
      account
    })

    await this.transactionRepository.save(transaction)

    return transaction
  }
}

export { CreateTransactionService }
