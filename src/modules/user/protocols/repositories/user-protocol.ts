import { User } from '@/modules/user/infrastructure/typeorm/entities/user'
import { CreateUserDto } from '@/modules/user/dtos/create-user-dto'

interface UserProtocol {
  create: (data: CreateUserDto) => User
  save: (data: User) => Promise<User>
  findById: (id: string) => Promise<User | undefined>
  findByEmail: (email: string) => Promise<User | undefined>
  findByPhone: (phone: string) => Promise<User | undefined>
  findByCpf: (cpf: string) => Promise<User | undefined>
}

export { UserProtocol }
