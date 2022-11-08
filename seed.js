import Record from './models/Record.js'
import User from './models/User.js'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()
import { faker } from '@faker-js/faker';


mongoose.connect(process.env.DB_CONN)

const howManyRecords = 200
const recordPromises = Array(howManyRecords).fill(null).map( () => {
  const recordObj = 
    { 
      title: faker.commerce.productName(),
      price: faker.commerce.price(5,100), 
      genre: ['Rock','Classic','Punk'][Math.floor(Math.random()*3)]
    }
    return Record.create(recordObj)
})

console.log('****** Create Records ******')

Record.collection.drop().then(() => {
  return Promise.all(recordPromises)
})


console.log(`****** ${howManyRecords} Records created ******`)


console.log('****** Create Users ******')

const howManyUsers = 10

const userPromises = Array(howManyUsers).fill(null).map( () => {
    const userObj = {
        name:            faker.name.firstName(),
        email:           faker.internet.email(),
        password:        faker.internet.password(),
    }

    userObj.email = userObj.email.toLowerCase()

    return User.create(userObj)
    })
    
User.collection.drop().then(() => {
  return Promise.all(userPromises)
    .then(() => process.exit())
})

console.log(`****** ${howManyUsers} Users created ******`)