'use strict'

const env = require('dotenv').config()
const userApi = require('.')
const bookApi = require('../bookApi')
const expect = require('expect')
const logic  = require('.')
const fetch = require('isomorphic-fetch')

const { mongoose, User, Book, BookTemplate  } = require('book-data')
const { env: { TEST_DB_URL } } = process

describe('bookApi', () => {
    describe('register user', () => {
        const name = 'Carlos'
        const surname = 'Calvo'
        const email = `Carlos-${Math.random()}@mail.com`
        const password = '123'
        const passwordConfirm = password
        it('should succeed on valid data', () =>{
           
        })
    })
})