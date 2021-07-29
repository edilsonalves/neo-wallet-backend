import { container } from 'tsyringe'

import { BCryptProvider } from './providers/hash-provider/implementations/bcrypt-provider'
import { HashProtocol } from './providers/hash-provider/protocols/hash-protocol'
import { JsonWebTokenProvider } from './providers/jwt-provider/implementations/jsonwebtoken-provider'
import { JwtProtocol } from './providers/jwt-provider/protocols/jwt-protocol'
import { CurrencyJsProvider } from './providers/currency-provider/implementations/currency-js-provider'
import { CurrencyProtocol } from './providers/currency-provider/protocols/currency-protocol'

import { UserRepository } from '@/modules/user/infrastructure/typeorm/repositories/user-repository'
import { UserProtocol } from '@/modules/user/protocols/repositories/user-protocol'
import { AccountRepository } from '@/modules/user/infrastructure/typeorm/repositories/account-repository'
import { AccountProtocol } from '@/modules/user/protocols/repositories/account-protocol'
import { TransactionRepository } from '@/modules/transaction/infrastructure/typeorm/repositories/transaction-repository'
import { TransactionProtocol } from '@/modules/transaction/protocols/repositories/transaction-protocol'

// Providers
container.registerSingleton<HashProtocol>('BCryptProvider', BCryptProvider)
container.registerSingleton<JwtProtocol>('JsonWebTokenProvider', JsonWebTokenProvider)
container.registerSingleton<CurrencyProtocol>('CurrencyJsProvider', CurrencyJsProvider)

// Repositories
container.registerSingleton<UserProtocol>('UserRepository', UserRepository)
container.registerSingleton<AccountProtocol>('AccountRepository', AccountRepository)
container.registerSingleton<TransactionProtocol>('TransactionRepository', TransactionRepository)
