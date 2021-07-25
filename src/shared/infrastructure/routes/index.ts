import { Router, Request, Response } from 'express'

import { userRoute } from '@/modules/user/infrastructure/http/routes/user-route'

const routes = Router()

routes.get('/', (_: Request, response: Response) => {
  return response.json({ message: 'neo-wallet' })
})

routes.use('/users', userRoute)

export { routes }
