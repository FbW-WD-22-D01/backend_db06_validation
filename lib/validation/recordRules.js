import {body} from 'express-validator'
import createHttpError from 'http-errors'

const genreAllowed = ['Rock', 'Punk', 'Classic']

export const createRecordValidation = [
    body('title')
        .exists().withMessage('Title missing')
        .isString().withMessage('Title should be String'),
    body('price')
        .exists().withMessage('Price missing')
        .isDecimal().withMessage('Price must be Number')
        // oder noch strikter:
        .custom( val => {
            if (typeof val==='number') return true
            throw createHttpError.BadRequest('Only numbers go through')
        }),
    body('genre')
        .isIn(genreAllowed)
        .withMessage(`Wrong input only ${genreAllowed.join()} allowed`)

    ]