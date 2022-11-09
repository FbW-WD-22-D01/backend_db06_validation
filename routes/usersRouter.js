import express from 'express'
import * as controller from '../controllers/usersController.js'
import 'express-async-errors'
import { validateInputs } from '../middleware/validation.js'
import { createUserValidation } from '../lib/validation/userRules.js'

const app = express.Router()

app.post('/', validateInputs(createUserValidation), controller.createUser)
app.get('/', controller.getUserList)

export default app