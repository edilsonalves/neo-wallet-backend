import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import { ShowTransactionsService } from '@/modules/transaction/services/show-transactions-service'

class TransactionController {
  public async index (request: Request, response: Response): Promise<Response> {
    const { id } = request.user

    const showTransactionsService = container.resolve(ShowTransactionsService)
    const transactions = await showTransactionsService.execute({ userId: id })

    return response.json(classToClass(transactions))
  }
}

export { TransactionController }
