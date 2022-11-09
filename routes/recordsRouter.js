import express from 'express'
import * as controller from '../controllers/recordsController.js'

/**
 * dadurch brauchen wir kein try-catch mehr bei async middlewares
 */
import 'express-async-errors'
import { validateInputs } from '../middleware/validation.js'
import { createRecordValidation } from '../lib/validation/recordRules.js'

const app = express.Router()

app.route('/')
  .get(controller.getAllRecords)
  .post(validateInputs(createRecordValidation), controller.createRecord)
  

// app.get('/by-title/:title', controller.getRecordById)

app.get('/:id', controller.getRecordById)


export default app