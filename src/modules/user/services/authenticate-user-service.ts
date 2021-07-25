import { injectable, inject } from 'tsyringe'

import { AppError } from '@/shared/errors/app-error'
import { User } from '../infrastructure/typeorm/entities/user'
import { HashProtocol } from '@/shared/containers/providers/hash-provider/protocols/hash-protocol'
import { UserProtocol } from '../protocols/repositories/user-protocol'
import { isValidCpf } from '../utils/is-valid-cpf'
import { JwtProtocol } from '@/shared/containers/providers/jwt-provider/protocols/jwt-protocol'

interface Request {
  cpf: string
  password: string
}

interface Response {
  user: User
  token: string
}

@injectable()
class AuthenticateUserService {
  constructor (
    @inject('BCryptProvider')
    private readonly bcryptProvider: HashProtocol,

    @inject('JsonWebTokenProvider')
    private readonly jsonWebTokenProvider: JwtProtocol,

    @inject('UserRepository')
    private readonly userRepository: UserProtocol
  ) {}

  public async execute ({ cpf, password }: Request): Promise<Response> {
    if (!isValidCpf(cpf)) {
      throw new AppError('CPF inválido', 409)
    }

    const user = await this.userRepository.findByCpf(cpf)

    if (user === undefined) {
      throw new AppError('CPF e/ou senha incorreto(s)', 401)
    }

    const correctPassword = await this.bcryptProvider.compareHash(password, user.password)

    if (!correctPassword) {
      throw new AppError('Nome de usuário/senha incorretos.', 401)
    }

    const token = this.jsonWebTokenProvider.generateToken(user.id)

    return { user, token }
  }
}

export { AuthenticateUserService }
