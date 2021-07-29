import { Router } from 'express'

import { authenticationMiddleware } from '@/shared/infrastructure/http/middlewares/authentication-middleware'
import { UserController } from '../controllers/user-controller'

const userRoute = Router()
const userController = new UserController()

userRoute.post('/', userController.create)

// Authenticated routes below
userRoute.use(authenticationMiddleware)

userRoute.get('/', userController.index)

export { userRoute }
