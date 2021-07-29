import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import { CreateUserService } from '@/modules/user/services/create-user-service'
import { ShowUserService } from '@/modules/user/services/show-user-service'

class UserController {
  public async create (request: Request, response: Response): Promise<Response> {
    const { firstName, lastName, email, phone, cpf, password, passwordConfirmation } = request.body

    const createUserService = container.resolve(CreateUserService)
    const user = await createUserService.execute({
      firstName,
      lastName,
      email,
      phone,
      cpf,
      password,
      passwordConfirmation
    })

    return response.json(classToClass(user))
  }

  public async index (request: Request, response: Response): Promise<Response> {
    const { id } = request.user

    const showUserService = container.resolve(ShowUserService)
    const user = await showUserService.execute({ userId: id })

    return response.json(classToClass(user))
  }
}

export { UserController }
