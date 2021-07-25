import { Router } from 'express'

import { SessionController } from '../controllers/session-controller'

const sessionRoute = Router()
const sessionsController = new SessionController()

sessionRoute.post('/', sessionsController.create)

export { sessionRoute }
