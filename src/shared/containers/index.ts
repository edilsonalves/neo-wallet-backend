import { container } from 'tsyringe'

import { BCryptProvider } from './providers/hash-provider/implementations/bcrypt-provider'
import { HashProtocol } from './providers/hash-provider/protocols/hash-protocol'
import { JsonWebTokenProvider } from './providers/jwt-provider/implementations/jsonwebtoken-provider'
import { JwtProtocol } from './providers/jwt-provider/protocols/jwt-protocol'

import { UserRepository } from '@/modules/user/infrastructure/typeorm/repositories/user-repository'
import { UserProtocol } from '@/modules/user/protocols/repositories/user-protocol'

// Providers
container.registerSingleton<HashProtocol>('BCryptProvider', BCryptProvider)
container.registerSingleton<JwtProtocol>('JsonWebTokenProvider', JsonWebTokenProvider)

// Repositories
container.registerSingleton<UserProtocol>('UserRepository', UserRepository)
