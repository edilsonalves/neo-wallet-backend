import { Router } from 'express'

import { UserController } from '@/modules/user/infrastructure/http/controllers/user-controller'

const userRoute = Router()
const userController = new UserController()

userRoute.post('/', userController.create)

export { userRoute }
