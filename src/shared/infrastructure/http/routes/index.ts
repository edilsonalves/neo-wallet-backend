import { Router, Request, Response } from 'express'

import { authenticationMiddleware } from '../middlewares/authentication-middleware'
import { sessionRoute } from '@/modules/user/infrastructure/http/routes/session-route'
import { userRoute } from '@/modules/user/infrastructure/http/routes/user-route'
import { accountRoute } from '@/modules/account/infrastructure/http/routes/account-route'
import { transactionRoute } from '@/modules/transaction/infrastructure/http/routes/transaction-route'

const routes = Router()

routes.get('/', (_: Request, response: Response) => {
  return response.json({ message: 'neo-wallet' })
})

routes.use('/sessions', sessionRoute)
routes.use('/users', userRoute)

// Authenticated routes below
routes.use(authenticationMiddleware)

routes.use('/accounts', accountRoute)
routes.use('/transactions', transactionRoute)

export { routes }
