import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import { CreateTransferService } from '@/modules/transaction/services/create-transfer-service'

class TransferController {
  public async create (request: Request, response: Response): Promise<Response> {
    const { accountId, fakeKey, description, value } = request.body
    const { id } = request.user

    const createTransferService = container.resolve(CreateTransferService)
    const transfer = await createTransferService.execute({
      userId: id,
      accountId,
      fakeKey,
      description,
      value
    })

    return response.json(classToClass(transfer))
  }
}

export { TransferController }
