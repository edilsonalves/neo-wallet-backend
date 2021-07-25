import { Router, Request, Response } from 'express'

import { sessionRoute } from '@/modules/user/infrastructure/http/routes/session-route'
import { userRoute } from '@/modules/user/infrastructure/http/routes/user-route'

const routes = Router()

routes.get('/', (_: Request, response: Response) => {
  return response.json({ message: 'neo-wallet' })
})

routes.use('/sessions', sessionRoute)
routes.use('/users', userRoute)

export { routes }
