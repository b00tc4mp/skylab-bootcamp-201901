const { expect } = require('chai')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const logic = require('../logic')

const { User } = require('../models')

describe('logic', () => {

    describe('registerUser', () => {

        it('should throw an error when the name is an array', () => {
            const name = []
            const username = 'michael'
            const email = 'sergio@gmail.com'
            const password = `123`

            expect(() => logic.registerUser(name, username, email, password)).to.throw(Error, 'name is not a string')

        })

        it('should throw an error when the name is emty', () => {
            const name = ''
            const username = 'michael'
            const email = 'sergio@gmail.com'
            const password = `123`

            expect(() => logic.registerUser(name, username, email, password)).to.throw(Error, 'name is empty')

        })

        it('should throw an error when the username is an array', () => {

            const name = 'sergio'
            const username = []
            const email = 'sergio@gmail.com'
            const password = `123`

            expect(() => logic.registerUser(name, username, email, password)).to.throw(Error, 'username is not a string')

        })

        it('should throw an error when the username is emty', () => {

            const name = 'sergio'
            const username = ''
            const email = 'sergio@gmail.com'
            const password = `123`

            expect(() => logic.registerUser(name, username, email, password)).to.throw(Error, 'username is empty')

        })

        it('should throw an error when the email is an array', () => {

            const name = 'sergio'
            const username = 'michael'
            const email = []
            const password = `123`

            expect(() => logic.registerUser(name, username, email, password)).to.throw(Error, 'email is not a string')

        })

        it('should throw an error when the email is emty', () => {

            const name = 'sergio'
            const username = 'michael'
            const email = ''
            const password = `123`

            expect(() => logic.registerUser(name, username, email, password)).to.throw(Error, 'email is empty')

        })

        it('should throw an error when the password is an array', () => {

            const name = 'sergio'
            const username = 'michael'
            const email = 'sergio@gmail.com'
            const password = []

            expect(() => logic.registerUser(name, username, email, password)).to.throw(Error, 'password is not a string')

        })

        it('should throw an error when the password is emty', () => {

            const name = 'sergio'
            const username = 'michael'
            const email = 'sergio@gmail.com'
            const password = ''

            expect(() => logic.registerUser(name, username, email, password)).to.throw(Error, 'password is empty')

        })
    })

    describe('loginUser', () => {

        it('should throw an error when the email is an array', () => {

            const email = []
            const password = `123`

            expect(() => logic.loginUser(email, password)).to.throw(Error, 'email is not a string')

        })

        it('should throw an error when the email is empty', () => {

            const email = ''
            const password = `123`

            expect(() => logic.loginUser(email, password)).to.throw(Error, 'email is empty')

        })

        it('should throw an error when the email is an password', () => {

            const email = 'sergio@gmail.com'
            const password = []

            expect(() => logic.loginUser(email, password)).to.throw(Error, 'password is not a string')

        })

        it('should throw an error when the password is empty', () => {

            const email = 'sergio@gmail.com'
            const password = ''

            expect(() => logic.loginUser(email, password)).to.throw(Error, 'password is empty')

        })

    })

    describe('retrieveUser', () => {

        it('should throw an error when the userId is an array', () => {

            const userId = []
            
            expect(() => logic.retrieveUser(userId)).to.throw(Error, 'userId is not a string')

        })

        it('should throw an error when the userId is empty', () => {

            const userId = ''
            
            expect(() => logic.retrieveUser(userId)).to.throw(Error, 'userId is empty')

        })

    })

    describe('updateUser', () => {

        it('should throw an error when the userId is an array', () => {

            const userId = []
            const userData = {
                name: "sergio"
            }
            
            expect(() => logic.updateUser(userId, userData)).to.throw(Error, 'userId is not a string')

        })

        it('should throw an error when the userId is empty', () => {

            const userId = ''
            const userData = {
                name: "sergio"
            }
            
            expect(() => logic.updateUser(userId, userData)).to.throw(Error, 'userId is empty')

        })

        it('should throw an error when the userData is an array', () => {

            const userId = '123423434'
            const userData = []
            
            expect(() => logic.updateUser(userId, userData)).to.throw(Error, 'userData is not an object')

        })


       

    })


    describe('deleteUser', () => {

        it('should throw an error when the userId is an array', () => {

            const userId = []
  
            expect(() => logic.deleteUser(userId)).to.throw(Error, 'userId is not a string')

        })

        it('should throw an error when the userId is empty', () => {

            const userId = ''
    
            expect(() => logic.deleteUser(userId)).to.throw(Error, 'userId is empty')

        })

    })


    describe('Congress', () => {

        it('should throw an error when the name is an array', () => {

            const name = []
  
            expect(() => logic.createCongress({name})).to.throw(Error, 'name is not a string')

        })

        it('should throw an error when the name is empty', () => {

            const name = ''
    
            expect(() => logic.createCongress({name})).to.throw(Error, 'name is empty')

        })

    })











})