import express from 'express'
import * as controller from '../controllers/ordersController.js'
import 'express-async-errors'
import { validateInputs } from '../middleware/validation.js'
import { createOrderValidation, patchOrderValidation } from '../lib/validation/orderRules.js'

const app = express.Router()

app.post('/', validateInputs(createOrderValidation), controller.createOrder)
app.get('/', controller.getOrderList)
app.patch('/:id',validateInputs(patchOrderValidation), controller.patchOrder)

export default app