import { Router, Request, Response } from 'express'

import { AppError } from '@/shared/errors/app-error'

const routes = Router()

routes.get('/', (_: Request, response: Response) => {
  return response.json({ message: 'hello-world' })
})

routes.get('/error', (_: Request, response: Response) => {
  throw new AppError('error', 400)
})

export { routes }
