import { Repository, getRepository, EntityManager } from 'typeorm'

import { Transaction } from '../entities/transaction'
import { TransactionProtocol } from '@/modules/transaction/protocols/repositories/transaction-protocol'
import { CreateTransactionDto } from '@/modules/transaction/dtos/create-transaction-dto'

class TransactionRepository implements TransactionProtocol {
  constructor (private readonly ormRepository: Repository<Transaction> = getRepository(Transaction)) {}

  public create (data: CreateTransactionDto): Transaction {
    const transaction = this.ormRepository.create(data)

    return transaction
  }

  public async save (data: Transaction): Promise<Transaction> {
    const transaction = await this.ormRepository.save(data)

    return transaction
  }

  public async saveTransaction (data: Transaction, entityManager: EntityManager): Promise<Transaction> {
    const transaction = await entityManager.save(data)

    return transaction
  }

  public async findByBarCode (barCode: string): Promise<Transaction | undefined> {
    const transaction = await this.ormRepository.findOne({ where: { barCode } })

    return transaction
  }
}

export { TransactionRepository }
