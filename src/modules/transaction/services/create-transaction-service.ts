import { injectable, inject } from 'tsyringe'
import currency from 'currency.js'

import { AppError } from '@/shared/errors/app-error'
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

    const currencyValue = currency(value).value

    if (currencyValue <= 0.00) {
      throw new AppError('Valor não permitido', 406)
    }

    const typeEnum = TransactionTypeEnum[
      type.toUpperCase() as keyof typeof TransactionTypeEnum
    ]

    if (typeEnum === undefined) {
      throw new AppError('Tipo de transação inválido', 404)
    }

    switch (typeEnum) {
      case TransactionTypeEnum.RESCUE:
      case TransactionTypeEnum.PAYMENT:
        if (currency(account.balance).subtract(currencyValue).value >= 0) {
          account.balance = currency(account.balance).subtract(currencyValue).value
        } else {
          throw new AppError('Saldo insuficiente', 200)
        }
        break
      default:
        account.balance = currency(account.balance).add(currencyValue).value
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
