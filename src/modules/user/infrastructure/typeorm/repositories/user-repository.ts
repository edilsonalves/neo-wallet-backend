import { Repository, getRepository } from 'typeorm'

import { UserProtocol } from '@/modules/user/protocols/repositories/user-protocol'
import { User } from '../entities/user'

class UserRepository implements UserProtocol {
  constructor (private readonly ormRepository: Repository<User> = getRepository(User)) {}

  public async findByEmail (email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: email })

    return user
  }

  public async findByPhone (phone: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: phone })

    return user
  }

  public async findByCpf (cpf: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: cpf })

    return user
  }
}

export { UserRepository }
