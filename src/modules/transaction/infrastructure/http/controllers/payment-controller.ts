import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import { CreatePaymentService } from '@/modules/transaction/services/create-payment-service'

class PaymentController {
  public async create (request: Request, response: Response): Promise<Response> {
    const { accountId, barCode, description, value } = request.body
    const { id } = request.user

    const createPaymentService = container.resolve(CreatePaymentService)
    const payment = await createPaymentService.execute({
      userId: id,
      accountId,
      barCode,
      description,
      value
    })

    return response.json(classToClass(payment))
  }
}

export { PaymentController }
