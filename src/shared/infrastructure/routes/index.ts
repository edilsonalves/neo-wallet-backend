import { Router, Request, Response } from 'express'

const routes = Router()

routes.get('/', (_: Request, response: Response) => {
  return response.json({ message: 'hello-world' })
})

export { routes }
