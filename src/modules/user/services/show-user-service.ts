import { injectable, inject } from 'tsyringe'

import { AppError } from '@/shared/errors/app-error'
import { User } from '../infrastructure/typeorm/entities/user'
import { UserProtocol } from '@/modules/user/protocols/repositories/user-protocol'
import { isValidId } from '@/shared/utils'

interface Request {
  userId: string
}

@injectable()
class ShowUserService {
  constructor (
    @inject('UserRepository')
    private readonly userRepository: UserProtocol
  ) {}

  public async execute ({ userId }: Request): Promise<User> {
    if (!isValidId(userId)) {
      throw new AppError('Usuário não identificado', 404)
    }

    const user = await this.userRepository.findById(userId)

    if (user === undefined) {
      throw new AppError('Usuário não identificado', 404)
    }

    return user
  }
}

export { ShowUserService }
