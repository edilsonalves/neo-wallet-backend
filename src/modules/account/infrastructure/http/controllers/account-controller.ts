import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import { CreateAccountService } from '@/modules/account/services/create-account-service'

class AccountController {
  public async create (request: Request, response: Response): Promise<Response> {
    const { id } = request.user

    const createAccountService = container.resolve(CreateAccountService)
    const user = await createAccountService.execute({ userId: id })

    return response.json(classToClass(user))
  }
}

export { AccountController }
