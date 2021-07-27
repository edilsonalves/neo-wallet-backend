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
  barCode: string
  description?: string
  value: number
}

@injectable()
class CreatePaymentService {
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
    barCode,
    description,
    value
  }: Request): Promise<Transaction | undefined> {
    if (!isValidId(userId)) {
      throw new AppError('Usuário não identificado', 404)
    }

    if (!isValidId(accountId)) {
      throw new AppError('Conta não identificada', 404)
    }

    // Barcode is also a UUID
    if (!isValidId(barCode)) {
      throw new AppError('Código de barras não identificado', 404)
    }

    // Checking if the payment has already been made
    const transactionByBarCode = await this.transactionRepository.findByBarCode(barCode)

    if (transactionByBarCode !== undefined) {
      throw new AppError('Pagamento já realizado', 200)
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

    const paymentValue = this.currencyJsProvider.getValue(value)
    const balanceValue = this.currencyJsProvider.getValue(account.balance)

    if (paymentValue <= 0.00) {
      throw new AppError('Valor não permitido', 406)
    }

    if (this.currencyJsProvider.subtract([balanceValue, paymentValue]) < 0.00) {
      throw new AppError('Saldo insuficiente', 200)
    }

    let transaction: Transaction | undefined

    await getConnection().transaction(async entityManager => {
      account.balance = this.currencyJsProvider.subtract([balanceValue, paymentValue])
      await this.accountRepository.saveTransaction(account, entityManager)

      transaction = this.transactionRepository.create({
        type: TransactionTypeEnum.PAYMENT,
        barCode,
        description,
        value: paymentValue,
        account
      })

      await this.transactionRepository.saveTransaction(transaction, entityManager)
    })

    return transaction
  }
}

export { CreatePaymentService }
