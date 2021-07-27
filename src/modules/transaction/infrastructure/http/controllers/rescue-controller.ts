import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import { CreateRescueService } from '@/modules/transaction/services/create-rescue-service'

class RescueController {
  public async create (request: Request, response: Response): Promise<Response> {
    const { accountId, value } = request.body
    const { id } = request.user

    const createRescueService = container.resolve(CreateRescueService)
    const rescue = await createRescueService.execute({
      userId: id,
      accountId,
      value
    })

    return response.json(classToClass(rescue))
  }
}

export { RescueController }
