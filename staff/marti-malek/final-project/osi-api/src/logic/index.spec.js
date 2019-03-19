'use strict'

require('dotenv').config()
require('isomorphic-fetch')

const { expect } = require('chai')
const { models: { User }, mongoose } = require('osi-data')
const logic = require('.')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const fse = require('fs-extra')

const { env: { DB_URL_TEST, JWT_SECRET } } = process

logic.jwtSecret = JWT_SECRET

describe('logic', () => {
    before(() => mongoose.connect(DB_URL_TEST, { useNewUrlParser: true }))

    beforeEach(() =>
        Promise.all([
            User.deleteMany()
        ])
    )

    describe('register user', () => {
        let name
        let surname
        let email
        let password
        let passwordConfirm

        beforeEach(() => {
            name = 'm'
            surname = 'm'
            email = `m-${Math.random()}@mail.com`
            password = '123'
            passwordConfirm = password
        })

        it('should succeed on valid data', async () => {
            await logic.registerUser(name, surname, email, password, passwordConfirm)

            const user = await User.findOne({ email: email }).select('-__v').lean()

            user.id = user._id.toString()

            delete user._id

            expect(user.name).to.equal(name)
            expect(user.surname).to.equal(surname)
            expect(user.email).to.equal(email)
            expect(user.id).to.be.a('string')

            const match = await bcrypt.compare(password, user.password)

            expect(match).to.be.true
        })

        /** NAME */
        it('should fail on object name instead of string', () => {
            name = {}
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${name} should be a string`)
        })

        it('should fail on boolean name instead of string', () => {
            name = true
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${name} should be a string`)
        })

        it('should fail on number name instead of string', () => {
            name = 4
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${name} should be a string`)
        })

        it('should fail on undefined name instead of string', () => {
            name = undefined
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${name} should be a string`)
        })

        it('should fail on null name instead of string', () => {
            name = null
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${name} should be a string`)
        })

        it('should fail on error name instead of string', () => {
            name = Error
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${name} should be a string`)
        })

        it('should fail on date name instead of string', () => {
            name = Date
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${name} should be a string`)
        })

        it('should fail on array name instead of string', () => {
            name = []
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${name} should be a string`)
        })

        it('should fail on empty name instead of string', () => {
            name = ''
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(Error, `name cannot be empty`)
        })

        /** SURNAME */

        it('should fail on object surname instead of string', () => {
            surname = {}
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${surname} should be a string`)
        })

        it('should fail on boolean surname instead of string', () => {
            surname = true
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${surname} should be a string`)
        })

        it('should fail on number surname instead of string', () => {
            surname = 4
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${surname} should be a string`)
        })

        it('should fail on undefined surname instead of string', () => {
            surname = undefined
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${surname} should be a string`)
        })

        it('should fail on null surname instead of string', () => {
            surname = null
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${surname} should be a string`)
        })

        it('should fail on error surname instead of string', () => {
            surname = Error
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${surname} should be a string`)
        })

        it('should fail on date surname instead of string', () => {
            surname = Date
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${surname} should be a string`)
        })

        it('should fail on array surname instead of string', () => {
            surname = []
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${surname} should be a string`)
        })

        it('should fail on empty surname instead of string', () => {
            surname = ''
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(Error, `surname cannot be empty`)
        })

        /** EMAIL */

        it('should fail on object email instead of string', () => {
            email = {}
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${email} should be a string`)
        })

        it('should fail on boolean email instead of string', () => {
            email = true
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${email} should be a string`)
        })

        it('should fail on number email instead of string', () => {
            email = 4
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${email} should be a string`)
        })

        it('should fail on undefined email instead of string', () => {
            email = undefined
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${email} should be a string`)
        })

        it('should fail on null email instead of string', () => {
            email = null
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${email} should be a string`)
        })

        it('should fail on error email instead of string', () => {
            email = Error
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${email} should be a string`)
        })

        it('should fail on date email instead of string', () => {
            email = Date
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${email} should be a string`)
        })

        it('should fail on array email instead of string', () => {
            email = []
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${email} should be a string`)
        })

        it('should fail on empty email instead of string', () => {
            email = ''
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(Error, `email cannot be empty`)
        })

        /** PASSWORD */

        it('should fail on object password instead of string', () => {
            password = {}
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${password} should be a string`)
        })

        it('should fail on boolean password instead of string', () => {
            password = true
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${password} should be a string`)
        })

        it('should fail on number password instead of string', () => {
            password = 4
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${password} should be a string`)
        })

        it('should fail on undefined password instead of string', () => {
            password = undefined
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${password} should be a string`)
        })

        it('should fail on null password instead of string', () => {
            password = null
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${password} should be a string`)
        })

        it('should fail on error password instead of string', () => {
            password = Error
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${password} should be a string`)
        })

        it('should fail on date password instead of string', () => {
            password = Date
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${password} should be a string`)
        })

        it('should fail on array password instead of string', () => {
            password = []
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${password} should be a string`)
        })

        it('should fail on empty password instead of string', () => {
            password = ''
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(Error, `password cannot be empty`)
        })

        /** PASSWORD CONFIRM */

        it('should fail on object passwordConfirm instead of string', () => {
            passwordConfirm = {}
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${passwordConfirm} should be a string`)
        })

        it('should fail on boolean passwordConfirm instead of string', () => {
            passwordConfirm = true
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${passwordConfirm} should be a string`)
        })

        it('should fail on number passwordConfirm instead of string', () => {
            passwordConfirm = 4
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${passwordConfirm} should be a string`)
        })

        it('should fail on undefined passwordConfirm instead of string', () => {
            passwordConfirm = undefined
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${passwordConfirm} should be a string`)
        })

        it('should fail on null passwordConfirm instead of string', () => {
            passwordConfirm = null
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${passwordConfirm} should be a string`)
        })

        it('should fail on error passwordConfirm instead of string', () => {
            passwordConfirm = Error
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${passwordConfirm} should be a string`)
        })

        it('should fail on date passwordConfirm instead of string', () => {
            passwordConfirm = Date
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${passwordConfirm} should be a string`)
        })

        it('should fail on array passwordConfirm instead of string', () => {
            passwordConfirm = []
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(TypeError, `${passwordConfirm} should be a string`)
        })

        it('should fail on empty passwordConfirm instead of string', () => {
            passwordConfirm = ''
            expect(() => logic.registerUser(name, surname, email, password, passwordConfirm)).to.throw(Error, `passwordConfirm cannot be empty`)
        })

        it('should fail on non-valid email instead of string', () => {
            email = `m@mail-${Math.random()}.com`
            return logic.registerUser(name, surname, email, password, passwordConfirm)
                .catch(error => expect(error.message).to.equal(`User validation failed: email: ${email} is not a valid email`))
        })

        it('should fail on already existing user', () =>
            logic.registerUser(name, surname, email, password, passwordConfirm)
                .then(() => logic.registerUser(name, surname, email, password, passwordConfirm))
                .catch(error => expect(error.message).to.equal(`user with email ${email} already exists`))
        )
    })

    describe('authenticate user', () => {

        let name = 'm'
        let surname = 'm'
        let email
        let password
        beforeEach(async () => {

            email = `m-${Math.random()}@mail.com`
            password = 'm'

            const hash = await bcrypt.hash(password, 10)

            const { id } = await User.create({ name, surname, email, password: hash })

            return id
        })

        it('should succeed with valid data', () => {
            return logic.authenticateUser(email, password)
                .then(token => {
                    expect(token).to.exist
                    return jwt.verify(token, JWT_SECRET)
                })
                .then(verified => {
                    expect(verified).to.exist
                    expect(verified.data).to.be.a('string')
                    expect(verified.iat).to.exist
                    expect(verified.exp).to.exist
                })
        })

        /** EMAIL */

        it('should fail on object email instead of string', () => {
            email = {}
            expect(() => logic.authenticateUser(email, password)).to.throw(TypeError, `${email} should be a string`)
        })

        it('should fail on boolean email instead of string', () => {
            email = true
            expect(() => logic.authenticateUser(email, password)).to.throw(TypeError, `${email} should be a string`)
        })

        it('should fail on number email instead of string', () => {
            email = 4
            expect(() => logic.authenticateUser(email, password)).to.throw(TypeError, `${email} should be a string`)
        })

        it('should fail on undefined email instead of string', () => {
            email = undefined
            expect(() => logic.authenticateUser(email, password)).to.throw(TypeError, `${email} should be a string`)
        })

        it('should fail on null email instead of string', () => {
            email = null
            expect(() => logic.authenticateUser(email, password)).to.throw(TypeError, `${email} should be a string`)
        })

        it('should fail on error email instead of string', () => {
            email = Error
            expect(() => logic.authenticateUser(email, password)).to.throw(TypeError, `${email} should be a string`)
        })

        it('should fail on date email instead of string', () => {
            email = Date
            expect(() => logic.authenticateUser(email, password)).to.throw(TypeError, `${email} should be a string`)
        })

        it('should fail on array email instead of string', () => {
            email = []
            expect(() => logic.authenticateUser(email, password)).to.throw(TypeError, `${email} should be a string`)
        })

        it('should fail on empty email instead of string', () => {
            email = ''
            expect(() => logic.authenticateUser(email, password)).to.throw(Error, `email cannot be empty`)
        })

        /** PASSWORD */

        it('should fail on object password instead of string', () => {
            password = {}
            expect(() => logic.authenticateUser(email, password)).to.throw(TypeError, `${password} should be a string`)
        })

        it('should fail on boolean password instead of string', () => {
            password = true
            expect(() => logic.authenticateUser(email, password)).to.throw(TypeError, `${password} should be a string`)
        })

        it('should fail on number password instead of string', () => {
            password = 4
            expect(() => logic.authenticateUser(email, password)).to.throw(TypeError, `${password} should be a string`)
        })

        it('should fail on undefined password instead of string', () => {
            password = undefined
            expect(() => logic.authenticateUser(email, password)).to.throw(TypeError, `${password} should be a string`)
        })

        it('should fail on null password instead of string', () => {
            password = null
            expect(() => logic.authenticateUser(email, password)).to.throw(TypeError, `${password} should be a string`)
        })

        it('should fail on error password instead of string', () => {
            password = Error
            expect(() => logic.authenticateUser(email, password)).to.throw(TypeError, `${password} should be a string`)
        })

        it('should fail on date password instead of string', () => {
            password = Date
            expect(() => logic.authenticateUser(email, password)).to.throw(TypeError, `${password} should be a string`)
        })

        it('should fail on array password instead of string', () => {
            password = []
            expect(() => logic.authenticateUser(email, password)).to.throw(TypeError, `${password} should be a string`)
        })

        it('should fail on empty password instead of string', () => {
            password = ''
            expect(() => logic.authenticateUser(email, password)).to.throw(Error, `password cannot be empty`)
        })

        it('should fail on user not found', () => {
            email = 'm@mail.com'
            password = 'p'
            return logic.authenticateUser(email, password)
                .catch(error => {
                    expect(error.message).to.equal(`user with email ${email} not found`)
                })
        })

        it('should fail on non-matching passwords not found', () => {
            password = 'not a match'
            return logic.authenticateUser(email, password)
                .catch(error => {
                    expect(error.message).to.equal('Error in credentials')
                })
        })
    })

    describe('retrieve user', () => {
        let name = 'm'
        let surname = 'm'
        let email
        let password
        let _token

        beforeEach(async () => {

            email = `m-${Math.random()}@mail.com`
            password = 'm'

            const hash = await bcrypt.hash(password, 10)

            await User.create({ name, surname, email, password: hash })

            const user = await User.findOne({ email })

            _token = jwt.sign({
                data: user.id
            }, JWT_SECRET, { expiresIn: '48h' })
        })

        it('should succeed on correct credentials', async () => {
            const user = await logic.retrieveUser(_token)

            expect(user).to.exist
            expect(user.name).to.equal(name)
            expect(user.surname).to.equal(surname)
            expect(user.email).to.equal(email)
            expect(user.password).not.to.exist
        })

        /** TOKEN */

        it('should fail on object token instead of string', () => {
            _token = {}
            expect(() => logic.retrieveUser(_token)).to.throw(TypeError, `${_token} should be a string`)
        })

        it('should fail on boolean token instead of string', () => {
            _token = true
            expect(() => logic.retrieveUser(_token)).to.throw(TypeError, `${_token} should be a string`)
        })

        it('should fail on number token instead of string', () => {
            _token = 4
            expect(() => logic.retrieveUser(_token)).to.throw(TypeError, `${_token} should be a string`)
        })

        it('should fail on undefined token instead of string', () => {
            _token = undefined
            expect(() => logic.retrieveUser(_token)).to.throw(TypeError, `${_token} should be a string`)
        })

        it('should fail on null token instead of string', () => {
            _token = null
            expect(() => logic.retrieveUser(_token)).to.throw(TypeError, `${_token} should be a string`)
        })

        it('should fail on error token instead of string', () => {
            _token = Error
            expect(() => logic.retrieveUser(_token)).to.throw(TypeError, `${_token} should be a string`)
        })

        it('should fail on date token instead of string', () => {
            _token = Date
            expect(() => logic.retrieveUser(_token)).to.throw(TypeError, `${_token} should be a string`)
        })

        it('should fail on array token instead of string', () => {
            _token = []
            expect(() => logic.retrieveUser(_token)).to.throw(TypeError, `${_token} should be a string`)
        })

        it('should fail on empty token instead of string', () => {
            _token = ''
            expect(() => logic.retrieveUser(_token)).to.throw(Error, `token cannot be empty`)
        })
    })

    describe('update user', () => {
        let name = 'm'
        let surname = 'm'
        let email
        let password
        let _token
        let data

        beforeEach(async () => {

            email = `m-${Math.random()}@mail.com`
            password = 'm'
            data = { name: 'newName' }

            const hash = await bcrypt.hash(password, 10)

            await User.create({ name, surname, email, password: hash })

            const user = await User.findOne({ email })

            _token = jwt.sign({
                data: user.id
            }, JWT_SECRET, { expiresIn: '48h' })
        })

        it('should succeed on correct params', () => {
            return logic.updateUser(_token, data)
                .then(() => logic.retrieveUser(_token))
                .then(user => {
                    expect(user.name).to.equal(data.name)
                    expect(user.surname).to.equal(surname)
                    expect(user.password).not.to.exist
                })
        })

        /** TOKEN */

        it('should fail on object token instead of string', () => {
            _token = {}
            expect(() => logic.updateUser(_token, data)).to.throw(TypeError, `${_token} should be a string`)
        })

        it('should fail on boolean token instead of string', () => {
            _token = true
            expect(() => logic.updateUser(_token, data)).to.throw(TypeError, `${_token} should be a string`)
        })

        it('should fail on number token instead of string', () => {
            _token = 4
            expect(() => logic.updateUser(_token, data)).to.throw(TypeError, `${_token} should be a string`)
        })

        it('should fail on undefined token instead of string', () => {
            _token = undefined
            expect(() => logic.updateUser(_token, data)).to.throw(TypeError, `${_token} should be a string`)
        })

        it('should fail on null token instead of string', () => {
            _token = null
            expect(() => logic.updateUser(_token, data)).to.throw(TypeError, `${_token} should be a string`)
        })

        it('should fail on error token instead of string', () => {
            _token = Error
            expect(() => logic.updateUser(_token, data)).to.throw(TypeError, `${_token} should be a string`)
        })

        it('should fail on date token instead of string', () => {
            _token = Date
            expect(() => logic.updateUser(_token, data)).to.throw(TypeError, `${_token} should be a string`)
        })

        it('should fail on array token instead of string', () => {
            _token = []
            expect(() => logic.updateUser(_token, data)).to.throw(TypeError, `${_token} should be a string`)
        })

        it('should fail on empty token instead of string', () => {
            _token = ''
            expect(() => logic.updateUser(_token, data)).to.throw(Error, `token cannot be empty`)
        })

        /** DATA */

        it('should fail on string data instead of string', () => {
            data = 'test'
            expect(() => logic.updateUser(_token, data)).to.throw(TypeError, `${data} should be an object`)
        })

        it('should fail on boolean data instead of string', () => {
            data = true
            expect(() => logic.updateUser(_token, data)).to.throw(TypeError, `${data} should be an object`)
        })

        it('should fail on number data instead of string', () => {
            data = 4
            expect(() => logic.updateUser(_token, data)).to.throw(TypeError, `${data} should be an object`)
        })

        it('should fail on undefined data instead of string', () => {
            data = undefined
            expect(() => logic.updateUser(_token, data)).to.throw(Error, `data must exist`)
        })

        it('should fail on null data instead of string', () => {
            data = null
            expect(() => logic.updateUser(_token, data)).to.throw(Error, `data must exist`)
        })

        it('should fail on error data instead of string', () => {
            data = Error
            expect(() => logic.updateUser(_token, data)).to.throw(TypeError, `${data} should be an object`)
        })

        it('should fail on date data instead of string', () => {
            data = Date
            expect(() => logic.updateUser(_token, data)).to.throw(TypeError, `${data} should be an object`)
        })

        it('should fail on array data instead of string', () => {
            data = []
            expect(() => logic.updateUser(_token, data)).to.throw(TypeError, `${data} should be an object`)
        })

        it('should fail on empty data instead of string', () => {
            data = ''
            expect(() => logic.updateUser(_token, data)).to.throw(Error, `data must exist`)
        })
    })

    describe('remove user', () => {
        let name = 'm'
        let surname = 'm'
        let email
        let password
        let _token

        beforeEach(async () => {

            email = `m-${Math.random()}@mail.com`
            password = 'm'

            const hash = await bcrypt.hash(password, 10)

            await User.create({ name, surname, email, password: hash })

            const user = await User.findOne({ email })

            _token = jwt.sign({
                data: user.id
            }, JWT_SECRET, { expiresIn: '48h' })
        })

        it('should succeed with correct params', () => {
            return logic.removeUser(_token)
                .then(res => {
                    expect(res).to.be.true
                    return logic.retrieveUser(_token)
                })
                .then(user => {
                    expect(user).to.be.null
                })
        })

        it('should fail on object token instead of string', () => {
            _token = {}
            expect(() => logic.removeUser(_token)).to.throw(TypeError, `${_token} should be a string`)
        })

        it('should fail on boolean token instead of string', () => {
            _token = true
            expect(() => logic.removeUser(_token)).to.throw(TypeError, `${_token} should be a string`)
        })

        it('should fail on number token instead of string', () => {
            _token = 4
            expect(() => logic.removeUser(_token)).to.throw(TypeError, `${_token} should be a string`)
        })

        it('should fail on undefined token instead of string', () => {
            _token = undefined
            expect(() => logic.removeUser(_token)).to.throw(TypeError, `${_token} should be a string`)
        })

        it('should fail on null token instead of string', () => {
            _token = null
            expect(() => logic.removeUser(_token)).to.throw(TypeError, `${_token} should be a string`)
        })

        it('should fail on error token instead of string', () => {
            _token = Error
            expect(() => logic.removeUser(_token)).to.throw(TypeError, `${_token} should be a string`)
        })

        it('should fail on date token instead of string', () => {
            _token = Date
            expect(() => logic.removeUser(_token)).to.throw(TypeError, `${_token} should be a string`)
        })

        it('should fail on array token instead of string', () => {
            _token = []
            expect(() => logic.removeUser(_token)).to.throw(TypeError, `${_token} should be a string`)
        })

        it('should fail on empty token instead of string', () => {
            _token = ''
            expect(() => logic.removeUser(_token)).to.throw(Error, `token cannot be empty`)
        })
    })

    describe('create root dir', () => {
        let name = 'm'
        let surname = 'm'
        let email
        let password
        let _token, userId

        beforeEach(async () => {

            email = `m-${Math.random()}@mail.com`
            password = 'm'

            const hash = await bcrypt.hash(password, 10)

            await User.create({ name, surname, email, password: hash })

            const user = await User.findOne({ email })

            userId = user.id

            _token = jwt.sign({
                data: user.id
            }, JWT_SECRET, { expiresIn: '48h' })
        })

        it('should succeed on correct params', () => {
            return logic.createRootDir(_token)
                .then(res => {
                    expect(res).to.equal('Done')
                    expect(fs.existsSync(`${__dirname}/../data/${userId}`)).to.be.true
                })
        })

        afterEach(async () => {
            const afterPath = `${__dirname}/../data/${userId}`
            if (fs.existsSync(afterPath)) {
                fse.remove(afterPath, err => { // Pretty bad!
                    if (err) throw err
                })
            }
        })
    })

    describe('create file', () => {
        let name = 'm'
        let surname = 'm'
        let email
        let password
        let _token, userId
        let fileContent = {
            name: 'testFile',
            type: '.txt',
            content: 'hello',
        }
        let filepath = '/test'

        beforeEach(async () => {

            email = `m-${Math.random()}@mail.com`
            password = 'm'

            const hash = await bcrypt.hash(password, 10)

            await User.create({ name, surname, email, password: hash })

            const user = await User.findOne({ email })

            userId = user.id

            _token = jwt.sign({
                data: user.id
            }, JWT_SECRET, { expiresIn: '48h' })

            // const afterPath = `${__dirname}/../data/${userId}`
            // return fs.rmdirSync(afterPath)
        })

        it('should succeed on correct params', async () => {
            await logic.createRootDir(_token)
            const res = await logic.createFile(_token, fileContent, filepath)
            expect(res).to.equal(`${fileContent.name}${fileContent.type}`)
            expect(await fs.existsSync(`${__dirname}/../data/${userId}`)).to.be.true
            const content = await fs.readdirSync(`${__dirname}/../data/${userId}`)
            expect(content[1]).to.equal(`${fileContent.name}${fileContent.type}`)
            debugger
            const file = await fs.readFileSync(`${__dirname}/../data/${userId}/${fileContent.name}${fileContent.type}`)
            expect(file).to.exist
            expect(file.constructor).to.equal(Buffer)
        })

        afterEach(async () => {
            const afterPath = `${__dirname}/../data/${userId}`
            if (fs.existsSync(afterPath)) {
                fse.remove(afterPath, err => {
                    if (err) throw err
                })
            }
        })
    })

    describe('retrieve file', () => {
        let name = 'm'
        let surname = 'm'
        let email
        let password
        let _token, userId
        let fileContent = {
            name: 'testFile',
            type: '.txt',
            content: 'hello',
            date: Date.now(),
        }
        let dirPath

        beforeEach(async () => {

            email = `m-${Math.random()}@mail.com`
            password = 'm'

            const hash = await bcrypt.hash(password, 10)

            await User.create({ name, surname, email, password: hash })

            const user = await User.findOne({ email })

            userId = user.id

            _token = jwt.sign({
                data: user.id
            }, JWT_SECRET, { expiresIn: '48h' })

            dirPath = `${__dirname}/../data/${userId}`

            fileContent.filepath = dirPath

            await fs.mkdirSync(dirPath)

            await fs.writeFileSync(`${dirPath}/${fileContent.name}`, JSON.stringify(fileContent))
        })

        it('should succeed on correct params', async () => {
            const file = await logic.retrieveFile(_token, `${fileContent.name}`)

            expect(file).to.exist
            expect(file).to.be.an('object')
            expect(file.name).to.equal(fileContent.name)
            expect(file.type).to.equal(fileContent.type)
            expect(file.content).to.equal(fileContent.content)

        })

        afterEach(() => {
            const afterPath = `${__dirname}/../data/${userId}`
            if (fs.existsSync(afterPath)) {
                fse.remove(afterPath, err => { // Pretty bad!
                    if (err) throw err
                })
            }
        })
    })

    describe('create dir', () => {
        let name = 'm'
        let surname = 'm'
        let email
        let password
        let _token, userId
        let dirPath

        beforeEach(async () => {

            email = `m-${Math.random()}@mail.com`
            password = 'm'

            const hash = await bcrypt.hash(password, 10)

            await User.create({ name, surname, email, password: hash })

            const user = await User.findOne({ email })

            userId = user.id

            _token = jwt.sign({
                data: user.id
            }, JWT_SECRET, { expiresIn: '48h' })

            dirPath = `${__dirname}/../data/${userId}`
        })

        it('should succeed on valid data', async () => {
            await logic.createRootDir(_token)
            const resPath = await logic.createDir(_token, '/test')
            expect(resPath).to.exist
            expect(resPath).to.equal('/test')
        })

        afterEach(() => {
            const afterPath = `${__dirname}/../data/${userId}`
            if (fs.existsSync(afterPath)) {
                fse.remove(afterPath, err => {
                    if (err) throw err
                })
            }
        })
    })

    describe('update file', () => {
        let name = 'm'
        let surname = 'm'
        let email
        let password
        let _token, userId
        let fileContent = {
            name: 'testFile',
            type: '.txt',
            content: 'hello',
            date: Date.now(),
        }
        let filePath = '/test'
        let dirPath

        beforeEach(async () => {

            email = `m-${Math.random()}@mail.com`
            password = 'm'

            const hash = await bcrypt.hash(password, 10)

            await User.create({ name, surname, email, password: hash })

            const user = await User.findOne({ email })

            userId = user.id

            _token = jwt.sign({
                data: user.id
            }, JWT_SECRET, { expiresIn: '48h' })

            dirPath = `${__dirname}/../data/${userId}`
        })

        it('should succeed on valid data', async () => {
            let updatedContent = '"updated"'
            let completePath = '/test.txt'
            await logic.createRootDir(_token)
            await logic.createFile(_token, fileContent, filePath)
            await logic.updateFile(_token, completePath, updatedContent)
            const file = await logic.retrieveFile(_token, completePath)

            expect(file).to.exist
            expect(file).to.equal('updated')
        })

        afterEach(() => {
            const afterPath = `${__dirname}/../data/${userId}`
            if (fs.existsSync(afterPath)) {
                fse.remove(afterPath, err => {
                    if (err) throw err
                })
            }
        })
    })

    describe('retrieve dir', () => {
        let name = 'm'
        let surname = 'm'
        let email
        let password
        let _token, userId
        let fileContent = {
            name: 'testFile',
            type: '.txt',
            content: 'hello',
            date: Date.now(),
        }
        let newPath = '/test'
        let dirPath

        beforeEach(async () => {

            email = `m-${Math.random()}@mail.com`
            password = 'm'

            const hash = await bcrypt.hash(password, 10)

            await User.create({ name, surname, email, password: hash })

            const user = await User.findOne({ email })

            userId = user.id

            _token = jwt.sign({
                data: user.id
            }, JWT_SECRET, { expiresIn: '48h' })

            dirPath = `${__dirname}/../data/${userId}`
        })

        it('should succeed on valid data', async () => {
            await logic.createRootDir(_token)
            await logic.createDir(_token, newPath)
            const directory = await logic.retrieveDir(_token, '/')

            expect(directory).to.exist
            expect(directory).to.be.a('array')
            expect(directory.toString()).to.equal(['test'].toString())
        })

        afterEach(() => {
            const afterPath = `${__dirname}/../data/${userId}`
            if (fs.existsSync(afterPath)) {
                fse.remove(afterPath, err => {
                    if (err) throw err
                })
            }
        })
    })

    after(() =>
        Promise.all([
            User.deleteMany()
        ])
            .then(() => mongoose.disconnect())
    )
})