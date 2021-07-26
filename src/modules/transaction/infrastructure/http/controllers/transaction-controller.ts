import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import { CreateTransactionService } from '@/modules/transaction/services/create-transaction-service'

class TransactionController {
  public async create (request: Request, response: Response): Promise<Response> {
    const { type, value, accountId } = request.body
    const { id } = request.user

    const createTransactionService = container.resolve(CreateTransactionService)
    const transaction = await createTransactionService.execute({
      userId: id,
      accountId,
      type,
      value
    })

    return response.json(classToClass(transaction))
  }
}

export { TransactionController }
