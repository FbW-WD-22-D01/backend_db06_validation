import {body, param} from 'express-validator'
import Order from '../../models/Order.js'
import Record from '../../models/Record.js'
import mongoose from 'mongoose'
import createHttpError from 'http-errors'

export const createOrderValidation = [
    body('comment').isString().withMessage('Comment has to be string'),
    body('records')
        .isArray().withMessage('Records Array missing')
        .custom( async (value) => {
            // Diese Funktion war etwas schwieriger, es gibt verschiedene Ansätze, hier 2:
            
            // Ansatz 1) alle ids in Object ids umwandeln. Bei der find() Methode, können wir mehrere ids gleichzeitig suchen mit $in. Im Anschluss die Länge der beiden Arrays vergleichen
            
            const idArray = value.map( el => mongoose.Types.ObjectId(el))
            const records = await Record.find({_id: {$in: idArray}})
            if (records.length !== value.length){
                throw createHttpError.BadRequest('Given records not found')
            }
            return true


            // Ansatz 2) Ähnlich wie im Seed Skript, erstellen wir einen Array aus Promises, in dem die Suchen nach den ids durchgeführt wird. Mit Promise.all() lösen wir die Promises auf. Da nicht gefundene records als null im Array erscheinen, müssen wir hier noch diese ausfiltern. Danach wie in Ansatz 1)
            
            // const findPromises = value.map( el => Record.findById(el))
            // const result = await Promise.all(findPromises)
            // const resultFilter = result.filter( el => el!==null)
            // if ( resultFilter.length !== value.length) {
            //     throw createHttpError.BadRequest('Given records not found')
            // }
            // return true
        })
]

export const patchOrderValidation = [
    param('id')
        .custom( async (value) => {
            const order = await Order.findById(value)
            if (order) return true
            throw createHttpError.BadRequest('Order not found')
        })
]