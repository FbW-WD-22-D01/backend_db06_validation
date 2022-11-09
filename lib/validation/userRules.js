import {body} from 'express-validator'
import createHttpError from 'http-errors'
import User from '../../models/User.js'


export const createUserValidation = [
    body('name')
        .isString()
        .withMessage('Name should be string')
        .trim()
        .exists({checkFalsy: true})
        .withMessage('no empty strings allowed'),

    body('password')
        .isString()
        .withMessage('Password should be string')
        .isStrongPassword({minLength: 7, minSymbols:0})
        .withMessage('Password to weak'),
    
    body('email')
        .isEmail()
        .withMessage('Email is not valid')
        .custom( async (val) => {
            const user = await User.findOne().where('email').equals(val)
            if (!user) return true
            throw createHttpError.BadRequest('User already exists')
        })
    
    ]