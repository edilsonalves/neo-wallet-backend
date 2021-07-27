import { Router } from 'express'

import { TransactionController } from '../controllers/transaction-controller'
import { DepositController } from '../controllers/deposit-controller'
import { RescueController } from '../controllers/rescue-controller'
import { PaymentController } from '../controllers/payment-controller'
import { TransferController } from '../controllers/transfer-controller'

const transactionRoute = Router()
const transactionController = new TransactionController()
const depositController = new DepositController()
const rescueController = new RescueController()
const paymentController = new PaymentController()
const transferController = new TransferController()

transactionRoute.get('/', transactionController.index)

transactionRoute.post('/deposit', depositController.create)
transactionRoute.post('/rescue', rescueController.create)
transactionRoute.post('/payment', paymentController.create)
transactionRoute.post('/transfer', transferController.create)

export { transactionRoute }
