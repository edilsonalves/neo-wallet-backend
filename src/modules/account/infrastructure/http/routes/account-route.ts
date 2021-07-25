import { Router } from 'express'

import { AccountController } from '../controllers/account-controller'

const accountRoute = Router()
const accountController = new AccountController()

accountRoute.post('/', accountController.create)

export { accountRoute }
