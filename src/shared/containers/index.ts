import { container } from 'tsyringe'

import { UserRepository } from '@/modules/user/infrastructure/typeorm/repositories/user-repository'
import { UserProtocol } from '@/modules/user/protocols/repositories/user-protocol'

container.registerSingleton<UserProtocol>('UserRepository', UserRepository)
