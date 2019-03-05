'use strict'

require('dotenv').config()

const { User } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const fs = require('fs')
const path = require('path')

const logic = {
    jwtSecret: null,
    /**
     * 
     * @param {string} name 
     * @param {string} surname 
     * @param {string} email 
     * @param {string} password 
     * @param {string} passwordConfirm 
     * 
     * @throws {Error} - On empty params
     * @throws {TypeError} - On incorrect data type
     */
    registerUser(name, surname, email, password, passwordConfirm) {

        if (typeof name !== 'string') throw TypeError(`${name} should be a string`)

        if (!name.trim().length) throw Error('name cannot be empty')

        if (typeof surname !== 'string') throw TypeError(`${surname} should be a string`)

        if (!surname.trim().length) throw Error('surname cannot be empty')

        if (typeof email !== 'string') throw TypeError(`${email} should be a string`)

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(`${password} should be a string`)

        if (!password.trim().length) throw Error('password cannot be empty')

        if (typeof passwordConfirm !== 'string') throw TypeError(`${passwordConfirm} should be a string`)

        if (!passwordConfirm.trim().length) throw Error('passwordConfirm cannot be empty')

        return (async () => {
            const user = await User.findOne({ email })

            if (user) throw Error(`user with email ${email} already exists`)
            debugger
            const hash = await bcrypt.hash(password, 10)

            const { id } = await User.create({ name, surname, email, password: hash })

            return id
        })()
    },
    /**
     * 
     * Authenticates the user by it's credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     * 
     * @throws {Error} - On empty data
     * @throws {TypeError} - On invalid data type
     */
    authenticateUser(email, password) {

        if (typeof email !== 'string') throw TypeError(`${email} should be a string`)

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(`${password} should be a string`)

        if (!password.trim().length) throw Error('password cannot be empty')

        return (async () => {
            const user = await User.findOne({ email })

            if (!user) throw Error(`user with email ${email} not found`)

            const match = await bcrypt.compare(password, user.password)

            if (!match) throw Error('Error in credentials')

            const userId = user.id

            const secret = this.jwtSecret

            const token = await jwt.sign({
                data: userId
            }, secret, { expiresIn: '48h' })

            return token
        })()
    },
    /**
     * 
     * Retrieves the user's data from it's token.
     * 
     * @param {string} token 
     * 
     * @throws {Error} - On empty data
     * @throws {TypeError} - On invalid data type
     */
    retrieveUser(token) {
        if (typeof token !== 'string') throw TypeError(`${token} should be a string`)

        if (!token.trim().length) throw Error('token cannot be empty')

        return (async () => {

            const verToken = await jwt.verify(token, this.jwtSecret)

            const user = await User.findById(verToken.data).select('-__v -password').lean()

            if (!user) return null

            user.id = user._id.toString()

            delete user._id

            return user
        })()
    },
    /**
     * 
     * Updates the user's data from it's token.
     * 
     * @param {string} token 
     * @param {Object} data 
     * 
     * @throws {Error} - On empty data
     * @throws {TypeError} - On invalid data type
     */
    updateUser(token, data) {

        if (typeof token !== 'string') throw TypeError(`${token} should be a string`)

        if (!token.trim().length) throw Error('token cannot be empty')

        if (!data) throw Error('data must exist')

        if (data.constructor !== Object) throw TypeError(`${data} should be an object`)

        return (async () => {

            const verToken = await jwt.verify(token, this.jwtSecret)

            const user = await User.findByIdAndUpdate(verToken.data, data).select('-__v -password').lean()

            user.id = user._id.toString()

            return true
        })()
    },
    /**
     * 
     * Removes the user from DB by it's token.
     * 
     * @param {string} token 
     * 
     * @throws {Error} - On empty data
     * @throws {TypeError} - On invalid data type
     */
    removeUser(token) {
        if (typeof token !== 'string') throw TypeError(`${token} should be a string`)

        if (!token.trim().length) throw Error('token cannot be empty')

        return (async () => {
            const verToken = await jwt.verify(token, this.jwtSecret)

            await User.findByIdAndDelete(verToken.data)

            return true
        })()
    },

    createDir(token) {

        if (typeof token !== 'string') throw TypeError(`${token} should be a string`)

        if (!token.trim().length) throw Error('token cannot be empty')

        return (async () => {
            const { data } = await jwt.verify(token, this.jwtSecret)

            if (!fs.existsSync(`${__dirname}/../data/${data}`)) {
                await fs.mkdirSync(`${__dirname}/../data/${data}`)
            }

            return 'Done'
        })()
    },

    createFile(token, fileContent) {
        if (typeof token !== 'string') throw TypeError(`${token} should be a string`)

        if (!token.trim().length) throw Error('token cannot be empty')

        if (!fileContent) throw Error(`fileContent must exist`)

        if (fileContent.constructor !== Object) throw TypeError(`${fileContent} should be an object`)

        return (async () => {
            const { data } = await jwt.verify(token, this.jwtSecret)

            const dirPath = `${__dirname}/../data/${data}`

            if (!fs.existsSync(dirPath)) {
                await fs.mkdirSync(dirPath)
            }

            if (!fs.existsSync(`${dirPath}/${fileContent.name}`)) {
                await fs.writeFileSync(`${dirPath}/${fileContent.name}`, JSON.stringify(fileContent), err => {
                    if (err) console.log(err)
                    else console.log('Nice!')
                })
            }

            return 'Done'
        })()
    }
}

module.exports = logic