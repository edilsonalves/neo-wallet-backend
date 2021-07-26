import { Router } from 'express'

import { TransactionController } from '../controllers/transaction-controller'

const transactionRoute = Router()
const transactionController = new TransactionController()

transactionRoute.post('/', transactionController.create)

export { transactionRoute }
