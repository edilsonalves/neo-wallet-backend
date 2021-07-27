import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import { CreateDepositService } from '@/modules/transaction/services/create-deposit-service'

class DepositController {
  public async create (request: Request, response: Response): Promise<Response> {
    const { accountId, value } = request.body
    const { id } = request.user

    const createDepositService = container.resolve(CreateDepositService)
    const deposit = await createDepositService.execute({
      userId: id,
      accountId,
      value
    })

    return response.json(classToClass(deposit))
  }
}

export { DepositController }
