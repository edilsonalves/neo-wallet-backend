import { injectable, inject } from 'tsyringe'
import { getConnection } from 'typeorm'

import { AppError } from '@/shared/errors/app-error'
import { CurrencyProtocol } from '@/shared/containers/providers/currency-provider/protocols/currency-protocol'
import { Transaction } from '../infrastructure/typeorm/entities/transaction'
import { TransactionProtocol } from '../protocols/repositories/transaction-protocol'
import { TransactionTypeEnum } from '../enums'
import { UserProtocol } from '@/modules/user/protocols/repositories/user-protocol'
import { AccountProtocol } from '@/modules/user/protocols/repositories/account-protocol'
import { isValidId } from '@/shared/utils'

interface Request {
  userId: string
  accountId: string
  fakeKey: string
  description?: string
  value: number
}

@injectable()
class CreateTransferService {
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
    fakeKey,
    description,
    value
  }: Request): Promise<Transaction | undefined> {
    if (!isValidId(userId)) {
      throw new AppError('Usuário não identificado', 404)
    }

    if (!isValidId(accountId)) {
      throw new AppError('Conta não identificada', 404)
    }

    const [user, originAccount, destinationAccount] = await Promise.all([
      this.userRepository.findById(userId),
      this.accountRepository.findById(accountId),
      this.accountRepository.findByFakeKey(fakeKey)
    ])

    if (user === undefined) {
      throw new AppError('Usuário não identificado', 404)
    }

    if (originAccount === undefined) {
      throw new AppError('Conta não identificada', 404)
    }

    if (destinationAccount === undefined) {
      throw new AppError('Chave Pix não identificada', 404)
    }

    if (originAccount.id === destinationAccount.id) {
      throw new AppError('Transferência não permitida', 409)
    }

    const transferValue = this.currencyJsProvider.getValue(value)
    const originBalanceValue = this.currencyJsProvider.getValue(originAccount.balance)
    const destinationBalanceValue = this.currencyJsProvider.getValue(destinationAccount.balance)

    if (transferValue <= 0.00) {
      throw new AppError('Valor não permitido', 406)
    }

    if (this.currencyJsProvider.subtract([originBalanceValue, transferValue]) < 0.00) {
      throw new AppError('Saldo insuficiente', 406)
    }

    let outboundTransaction: Transaction | undefined
    let inboundTransaction: Transaction | undefined

    await getConnection().transaction(async entityManager => {
      originAccount.balance = this.currencyJsProvider.subtract([originBalanceValue, transferValue])
      destinationAccount.balance = this.currencyJsProvider.add([destinationBalanceValue, transferValue])

      await Promise.all([
        this.accountRepository.saveTransaction(originAccount, entityManager),
        this.accountRepository.saveTransaction(destinationAccount, entityManager)
      ])

      outboundTransaction = this.transactionRepository.create({
        type: TransactionTypeEnum.OUTGOING_TRANSFER,
        fakeKey: destinationAccount.fakeKey,
        description,
        value: transferValue,
        account: originAccount
      })
      inboundTransaction = this.transactionRepository.create({
        type: TransactionTypeEnum.INCOMING_TRANSFER,
        fakeKey: originAccount.fakeKey,
        description,
        value: transferValue,
        account: destinationAccount
      })

      await Promise.all([
        this.transactionRepository.saveTransaction(outboundTransaction, entityManager),
        this.transactionRepository.saveTransaction(inboundTransaction, entityManager)
      ])
    })

    return outboundTransaction
  }
}

export { CreateTransferService }
