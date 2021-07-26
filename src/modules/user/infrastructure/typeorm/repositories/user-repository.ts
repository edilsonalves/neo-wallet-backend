import { Repository, getRepository } from 'typeorm'

import { User } from '../entities/user'
import { UserProtocol } from '@/modules/user/protocols/repositories/user-protocol'
import { CreateUserDto } from '@/modules/user/dtos/create-user-dto'

class UserRepository implements UserProtocol {
  constructor (private readonly ormRepository: Repository<User> = getRepository(User)) {}

  public create (data: CreateUserDto): User {
    const user = this.ormRepository.create(data)

    return user
  }

  public async save (data: User): Promise<User> {
    const user = await this.ormRepository.save(data)

    return user
  }

  public async findById (id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id, {
      relations: ['account']
    })

    return user
  }

  public async findByEmail (email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } })

    return user
  }

  public async findByPhone (phone: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { phone } })

    return user
  }

  public async findByCpf (cpf: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { cpf },
      relations: ['account']
    })

    return user
  }
}

export { UserRepository }
