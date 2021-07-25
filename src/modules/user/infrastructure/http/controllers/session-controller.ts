import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import { AuthenticateUserService } from '@/modules/user/services/authenticate-user-service'

class SessionController {
  public async create (request: Request, response: Response): Promise<Response> {
    const { cpf, password } = request.body

    const authenticateUserService = container.resolve(AuthenticateUserService)
    const { user, token } = await authenticateUserService.execute({ cpf, password })

    return response.json({ user: classToClass(user), token })
  }
}

export { SessionController }
