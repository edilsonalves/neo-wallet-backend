import { User } from '../../infrastructure/typeorm/entities/user'

interface UserProtocol {
  findByEmail: (email: string) => Promise<User | undefined>
  findByPhone: (phone: string) => Promise<User | undefined>
  findByCpf: (cpf: string) => Promise<User | undefined>
}

export { UserProtocol }
