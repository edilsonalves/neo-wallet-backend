import { injectable, inject } from 'tsyringe'

import { AppError } from '@/shared/errors/app-error'
import { User } from '../infrastructure/typeorm/entities/user'
import { HashProtocol } from '@/shared/containers/providers/hash-provider/protocols/hash-protocol'
import { UserProtocol } from '../protocols/repositories/user-protocol'
import { isValidCpf, isValidEmail } from '../utils'

interface Request {
  firstName: string
  lastName: string
  email: string
  phone: string
  cpf: string
  password: string
  passwordConfirmation: string
}

@injectable()
class CreateUserService {
  constructor (
    @inject('BCryptProvider')
    private readonly bcryptProvider: HashProtocol,

    @inject('UserRepository')
    private readonly userRepository: UserProtocol
  ) {}

  public async execute ({
    firstName,
    lastName,
    email,
    phone,
    cpf,
    password,
    passwordConfirmation
  }: Request): Promise<User> {
    if (isValidEmail(email)) {
      const userByEmail = await this.userRepository.findByEmail(email)

      if (userByEmail !== undefined) {
        throw new AppError('E-mail já cadastrado', 409)
      }
    } else {
      throw new AppError('E-mail inválido', 409)
    }

    const userByPhone = await this.userRepository.findByPhone(phone)

    if (userByPhone !== undefined) {
      throw new AppError('Telefone já cadastrado', 409)
    }

    if (isValidCpf(cpf)) {
      const userByCpf = await this.userRepository.findByCpf(cpf)

      if (userByCpf !== undefined) {
        throw new AppError('CPF já cadastrado', 409)
      }
    } else {
      throw new AppError('CPF inválido', 409)
    }

    if (password !== passwordConfirmation) {
      throw new AppError('As senhas não coincidem', 409)
    }

    const hashedPassword = await this.bcryptProvider.generateHash(password)

    const user = this.userRepository.create({
      firstName,
      lastName,
      email,
      phone,
      cpf,
      password: hashedPassword
    })

    await this.userRepository.save(user)

    return user
  }
}

export { CreateUserService }
