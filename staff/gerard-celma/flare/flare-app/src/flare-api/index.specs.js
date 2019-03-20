'use strict'

require('dotenv').config()

const { mongoose, models: { User, Message } } = require('datify')
import flareApi from './index'
import bcrypt from 'bcrypt'


const { env: { REACT_APP_TEST_DB_URL } } = process


describe('flareApi', () => {
    beforeAll(() => mongoose.connect(REACT_APP_TEST_DB_URL, { useNewUrlParser: true }))
    
    beforeEach(() =>
    Promise.all([
        Message.deleteMany(),
        User.deleteMany()
    ])
    )
    
    describe('register user', () => {
        const name = 'carlos'
        const surname = 'perez'
        const email = `carlosperez-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const passwordConfirm = password
        
        it('should succeed on valid data', async () => {
            const id = await flareApi.registerUser(name, surname, email, password, passwordConfirm)

            expect(id).toBeDefined()
            expect(typeof id).toBe('string')

            const user = await User.findOne({ email })
            
            expect(user.name).toBe(name)
            expect(user.surname).toBe(surname)
            expect(user.email).toBe(email)

            const match = await bcrypt.compare(password, user.password)

            expect(match).toBeTruthy()
        })

        it('should fail on undefined name', () => {
            const name = undefined
            const surname = 'perez'
            const email = 'carlosperez@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                flareApi.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on numeric name', () => {
            const name = 10
            const surname = 'perez'
            const email = 'carlosperez@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                flareApi.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })


        it('should fail on boolean name', () => {
            const name = true
            const surname = 'perez'
            const email = 'carlosperez@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                flareApi.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on object name', () => {
            const name = {}
            const surname = 'perez'
            const email = 'carlosperez@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                flareApi.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on array name', () => {
            const name = []
            const surname = 'perez'
            const email = 'carlosperez@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                flareApi.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on empty name', () => {
            const name = ''
            const surname = 'perez'
            const email = 'carlosperez@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                flareApi.registerUser(name, surname, email, password, password)
            }).toThrow(Error('name is empty or blank'))
        })

        it('should fail on undefined surname', () => {
            const name = 'carlos'
            const surname = undefined
            const email = 'carlosperez@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                flareApi.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError('undefined is not a string'))
        })

        it('should fail on numeric surname', () => {
            const name = 'carlos'
            const surname = 10
            const email = 'carlosperez@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                flareApi.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError('10 is not a string'))
        })


        it('should fail on boolean surname', () => {
            const name = 'carlos'
            const surname = false
            const email = 'carlosperez@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                flareApi.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on object surname', () => {
            const name = 'carlos'
            const surname = {}
            const email = 'carlosperez@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                flareApi.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on array surname', () => {
            const name = 'carlos'
            const surname = []
            const email = 'carlosperez@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                flareApi.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on empty surname', () => {
            const name = 'carlos'
            const surname = ''
            const email = 'carlosperez@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                flareApi.registerUser(name, surname, email, password, password)
            }).toThrow(Error('surname is empty or blank'))
        })

        it('should fail on undefined password', () => {
            const name = 'carlos'
            const surname = 'perez'
            const email = 'carlosperez@mail.com'
            const password = undefined

            expect(() => {
                flareApi.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on numeric password', () => {
            const name = 'carlos'
            const surname = 'perez'
            const email = 'carlosperez@mail.com'
            const password = 123

            expect(() => {
                flareApi.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })


        it('should fail on boolean password', () => {
            const name = 'carlos'
            const surname = 'perez'
            const email = 'carlosperez@mail.com'
            const password = true

            expect(() => {
                flareApi.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on object password', () => {
            const name = 'carlos'
            const surname = 'perez'
            const email = 'carlosperez@mail.com'
            const password = {}

            expect(() => {
                flareApi.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on array password', () => {
            const name = 'carlos'
            const surname = 'perez'
            const email = 'carlosperez@mail.com'
            const password = []

            expect(() => {
                flareApi.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on empty password', () => {
            const name = 'carlos'
            const surname = 'perez'
            const email = 'carlosperez@mail.com'
            const password = ``

            expect(() => {
                flareApi.registerUser(name, surname, email, password, password)
            }).toThrow(Error('password is empty or blank'))
        })

        it('should fail on different password and passwordConfirm', () => {
            const name = 'carlos'
            const surname = 'perez'
            const email = `carlosperez@mail.com`
            const password = `123`
            const passwordConfirm = '456'

            expect(() => {
                flareApi.registerUser(name, surname, email, password, passwordConfirm)
            }).toThrow(Error('passwords do not match'))
        })

        it('should fail on existing user', () => {
            const name = 'carlos'
            const surname = 'perez'
            const email = `carlosperez@mail.com`
            const password = `123`
            const passwordConfirm = password

            return flareApi.registerUser(name, surname, email, password, password)
                    .then(() => flareApi.registerUser(name, surname, email, password, password))
                        .catch(({message}) => {
                            expect(message).toBe(`user with email ${email} already exists`)
                        })  
        })
    })

    describe('authenticate user', () => {
        const name = 'carlos'
        const surname = 'perez'
        const email = `carlosperez-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`

        let pass = password
        let mail = email

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
        )

        it('should succeed on correct credentials', () =>
            flareApi.authenticateUser(email, password)
                .then(id => expect(id).toBeDefined())
        )

        it('should fail on undefined email', () => {
            const email = undefined
            const password = pass

            expect(() => {
                flareApi.authenticateUser(email, password)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on numeric email', () => {
            const email = 123
            const password = pass

            expect(() => {
                flareApi.authenticateUser(email, password)
            }).toThrow(TypeError(email + ' is not a string'))
        })


        it('should fail on boolean email', () => {
            const email = true
            const password = pass

            expect(() => {
                flareApi.authenticateUser(email, password)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on object email', () => {
            const email = {}
            const password = pass

            expect(() => {
                flareApi.authenticateUser(email, password)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on array email', () => {
            const email = []
            const password = pass

            expect(() => {
                flareApi.authenticateUser(email, password)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on empty email', () => {
            const email = ''
            const password = pass

            expect(() => {
                flareApi.authenticateUser(email, password)
            }).toThrow(Error('email is empty or blank'))
        })

        it('should fail on undefined password', () => {
            const email = 'carlosperez@mail.com'
            const password = undefined

            expect(() => {
                flareApi.authenticateUser(email, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on numeric password', () => {
            const email = 'carlosperez@mail.com'
            const password = 123

            expect(() => {
                flareApi.authenticateUser(email, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })


        it('should fail on boolean password', () => {
            const email = 'carlosperez@mail.com'
            const password = true

            expect(() => {
                flareApi.authenticateUser(email, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on object password', () => {
            const email = 'carlosperez@mail.com'
            const password = {}

            expect(() => {
                flareApi.authenticateUser(email, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on array password', () => {
            const email = 'carlosperez@mail.com'
            const password = []

            expect(() => {
                flareApi.authenticateUser(email, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on empty password', () => {
            const email = 'carlosperez@mail.com'
            const password = ``

            expect(() => {
                flareApi.authenticateUser(email, password)
            }).toThrow(Error('password is empty or blank'))
        })

        it('should fail on incorrect email', () => {
            const email = 'test666@mail.com'
            const password = pass

            flareApi.authenticateUser(email, password)
                .catch(({message}) => {
                    expect(message).toBe(`user with email ${email} not found`)
                })
        })

        it('should fail on incorrect password', () => {
            const email = mail
            const password = '456'

            flareApi.authenticateUser(email, password)
                .catch(({message}) => {
                    expect(message).toBe('wrong credentials')
                })
        })
    })

    describe.only('retrieve user', () => {
        const name = 'carlos'
        const surname = 'perez'
        const email = `carlosperez-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`

        let userId
        let token

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => flareApi.authenticateUser(email, password))
                .then(res => token = res.token)
        )

        it('should fail on undefined token', () => {
            const token = undefined

            expect(() => {
                flareApi.retrieveUser(token)
            }).toThrow(TypeError(token + ' is not a string'))
        })

        it('should fail on numeric token', () => {
            const token = 123

            expect(() => {
                flareApi.retrieveUser(token)
            }).toThrow(TypeError(token + ' is not a string'))
        })


        it('should fail on boolean token', () => {
            const token = true

            expect(() => {
                flareApi.retrieveUser(token)
            }).toThrow(TypeError(token + ' is not a string'))
        })

        it('should fail on object token', () => {
            const token = {}

            expect(() => {
                flareApi.retrieveUser(token)
            }).toThrow(TypeError(token + ' is not a string'))
        })

        it('should fail on array token', () => {
            const token = []

            expect(() => {
                flareApi.retrieveUser(token)
            }).toThrow(TypeError(token + ' is not a string'))
        })

        it('should fail on empty token', () => {
            const token = ``

            expect(() => {
                flareApi.retrieveUser(token)
            }).toThrow(Error('token is empty or blank'))
        })

        it('should succeed on correct credentials', () =>
            flareApi.retrieveUser(token)
                .then(user => {
                    expect(user.id).toBe(userId)
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.email).toBe(email)

                    expect(user.save).toBeUndefined()
                })
        )

        it('should fail on wrong userId', () => {
            flareApi.retrieveUser('5c83d5ab667269067002ce97')
                .catch(({ message }) => {
                    expect(message).toBe(`user with id 5c83d5ab667269067002ce97 not found`)
                })
        })
    })

    describe('retrieve users', () => {
        const name = 'carlos'
        const surname = 'perez'
        const email = `carlosperez-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`

        let userId
        let token

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => flareApi.authenticateUser(email, password))
                .then(res => token = res.token)
        )

        it('should fail on undefined token', () => {
            const token = undefined

            expect(() => {
                flareApi.retrieveUsers(token)
            }).toThrow(TypeError(token + ' is not a string'))
        })

        it('should fail on numeric token', () => {
            const token = 123

            expect(() => {
                flareApi.retrieveUsers(token)
            }).toThrow(TypeError(token + ' is not a string'))
        })


        it('should fail on boolean token', () => {
            const token = true

            expect(() => {
                flareApi.retrieveUsers(token)
            }).toThrow(TypeError(token + ' is not a string'))
        })

        it('should fail on object token', () => {
            const token = {}

            expect(() => {
                flareApi.retrieveUsers(token)
            }).toThrow(TypeError(token + ' is not a string'))
        })

        it('should fail on array token', () => {
            const token = []

            expect(() => {
                flareApi.retrieveUsers(token)
            }).toThrow(TypeError(token + ' is not a string'))
        })

        it('should fail on empty token', () => {
            const token = ``

            expect(() => {
                flareApi.retrieveUsers(token)
            }).toThrow(Error('token is empty or blank'))
        })

        it('should succeed on correct credentials', () =>
            flareApi.retrieveUsers(token)
                .then(users => {
                            users.map(user => {
                            expect(user.id).toBe(userId)
                            expect(user.name).toBe(name)
                            expect(user.surname).toBe(surname)
                            expect(user.email).toBe(email)
                            
                            expect(user.save).toBeUndefined()
                        })
                })
        )

        it('should fail on wrong token', () => 
            flareApi.retrieveUsers('5c83d5ab667269067002ce97')
                .catch(({ message }) => {
                    expect(message).toBe(`jwt malformed`)
                })
        )
    })

    describe('update user', () => {
        const name = 'carlos'
        const surname = 'perez'
        const email = `carlosperez-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`

        const _name = 'Jaume'
        const _surname = 'Pujol'
        const _email = `jaumepujol-${Math.random()}@mail.com`

        let userId
        let token

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => flareApi.authenticateUser(email, password))
                .then(res => token = res.token)
        )

        it('should fail on undefined token', () => {
            const token = undefined

            expect(() => {
                flareApi.updateUser(token, _name, _surname, _email)
            }).toThrow(TypeError(token + ' is not a string'))
        })

        it('should fail on numeric token', () => {
            const token = 123

            expect(() => {
                flareApi.updateUser(token, _name, _surname, _email)
            }).toThrow(TypeError(token + ' is not a string'))
        })


        it('should fail on boolean token', () => {
            const token = true

            expect(() => {
                flareApi.updateUser(token, _name, _surname, _email)
            }).toThrow(TypeError(token + ' is not a string'))
        })

        it('should fail on object token', () => {
            const token = {}

            expect(() => {
                flareApi.updateUser(token, _name, _surname, _email)
            }).toThrow(TypeError(token + ' is not a string'))
        })

        it('should fail on array token', () => {
            const token = []

            expect(() => {
                flareApi.updateUser(token, _name, _surname, _email)
            }).toThrow(TypeError(token + ' is not a string'))
        })

        it('should fail on empty token', () => {
            const token = ``

            expect(() => {
                flareApi.updateUser(token, _name, _surname, _email)
            }).toThrow(Error('token is empty or blank'))
        })

        it('should fail on undefined email', () => {
            const _email = undefined

            expect(() => {
                flareApi.updateUser(userId, _name, _surname, _email)
            }).toThrow(TypeError(_email + ' is not a string'))
        })

        it('should fail on numeric email', () => {
            const _email = 123

            expect(() => {
                flareApi.updateUser(userId, _name, _surname, _email)
            }).toThrow(TypeError(_email + ' is not a string'))
        })


        it('should fail on boolean email', () => {
            const _email = true

            expect(() => {
                flareApi.updateUser(userId, _name, _surname, _email)
            }).toThrow(TypeError(_email + ' is not a string'))
        })

        it('should fail on object email', () => {
            const _email = {}

            expect(() => {
                flareApi.updateUser(userId, _name, _surname, _email)
            }).toThrow(TypeError(_email + ' is not a string'))
        })

        it('should fail on array email', () => {
            const _email = []

            expect(() => {
                flareApi.updateUser(userId, _name, _surname, _email)
            }).toThrow(TypeError(_email + ' is not a string'))
        })

        it('should fail on empty email', () => {
            const _email = ''

            expect(() => {
                flareApi.updateUser(userId, _name, _surname, _email)
            }).toThrow(Error('email is empty or blank'))
        })

        it('should fail on undefined surname', () => {
            const _surname = undefined

            expect(() => {
                flareApi.updateUser(userId, _name, _surname, _email)
            }).toThrow(TypeError(_surname + ' is not a string'))
        })

        it('should fail on numeric surname', () => {
            const _surname = 123

            expect(() => {
                flareApi.updateUser(userId, _name, _surname, _email)
            }).toThrow(TypeError(_surname + ' is not a string'))
        })


        it('should fail on boolean surname', () => {
            const _surname = true

            expect(() => {
                flareApi.updateUser(userId, _name, _surname, _email)
            }).toThrow(TypeError(_surname + ' is not a string'))
        })

        it('should fail on object surname', () => {
            const _surname = {}

            expect(() => {
                flareApi.updateUser(userId, _name, _surname, _email)
            }).toThrow(TypeError(_surname + ' is not a string'))
        })

        it('should fail on array surname', () => {
            const _surname = []

            expect(() => {
                flareApi.updateUser(userId, _name, _surname, _email)
            }).toThrow(TypeError(_surname + ' is not a string'))
        })

        it('should fail on empty surname', () => {
            const _surname = ''

            expect(() => {
                flareApi.updateUser(userId, _name, _surname, _email)
            }).toThrow(Error('surname is empty or blank'))
        })

        it('should fail on undefined name', () => {
            const _name = undefined

            expect(() => {
                flareApi.updateUser(userId, _name, _surname, _email)
            }).toThrow(TypeError(_name + ' is not a string'))
        })

        it('should fail on numeric name', () => {
            const _name = 123

            expect(() => {
                flareApi.updateUser(userId, _name, _surname, _email)
            }).toThrow(TypeError(_name + ' is not a string'))
        })


        it('should fail on boolean name', () => {
            const _name = true

            expect(() => {
                flareApi.updateUser(userId, _name, _surname, _email)
            }).toThrow(TypeError(_name + ' is not a string'))
        })

        it('should fail on object name', () => {
            const _name = {}

            expect(() => {
                flareApi.updateUser(userId, _name, _surname, _email)
            }).toThrow(TypeError(_name + ' is not a string'))
        })

        it('should fail on array name', () => {
            const _name = []

            expect(() => {
                flareApi.updateUser(userId, _name, _surname, _email)
            }).toThrow(TypeError(_name + ' is not a string'))
        })

        it('should fail on empty name', () => {
            const _name = ''

            expect(() => {
                flareApi.updateUser(userId, _name, _surname, _email)
            }).toThrow(Error('name is empty or blank'))
        })
        
        it('should work with correct credentials', () => 
            flareApi.updateUser(token, _name, _surname, _email)
                .then(user => {
                    expect(user.name).toBe(_name)
                    expect(user.surname).toBe(_surname)
                    expect(user.email).toBe(_email)
                })
        )

        it('should fail with incorrect credentials', () => 
            flareApi.updateUser('5c83d64f667269067002ce99', _name, _surname, _email)
                .catch(({ message }) => expect(message).toBe(`jwt malformed`))
        )
    })

    describe('uploadMessagePhoto', () => {
        let name = 'carlos'
        let surname = 'perez'
        let email = `carlosperez-${Math.random()}@mail.com`
        let password = `123-${Math.random()}`

        let _name = 'pepe'
        let _surname = 'gomez'
        let _email = `pepegomez-${Math.random()}@mail.com`
        let _password = `123-${Math.random()}`

        let launchDate = '2019-03-21'
        let position = [40.2345, 2.4365]
        let text = 'sample message text'

        let userIdFrom
        let token
        let userIdTo
        let msgId
        let data = new File(['foo', 'bar'],'name' ,[{filePropertyBag : 'foo'}])

        beforeEach(async () => {
   
            const hash1 = await bcrypt.hash(password, 10)

            let { id } = await User.create({ name, surname, email, password: hash1 })

            userIdFrom = id

            const userToken = await flareApi.authenticateUser(email, password)

            token = userToken.token

            const hash2 = await bcrypt.hash(_password, 10)

            let user = await User.create({ name: _name, surname: _surname, email: _email, password: hash2 })

            userIdTo =  user.id

            const { _id } = await Message.create({userIdFrom, userIdTo, launchDate, position, text})

            msgId = _id

            const addUserFrom = await User.findByIdAndUpdate(userIdFrom, { msgSent: _id })

            const addUserTo = await User.findByIdAndUpdate(userIdTo, { msgReceived: _id })
        })

        it('should fail on undefined userIdFrom', () => {
            const userIdFrom = undefined
            const url = "test-url"

            expect(() => {
                logic.uploadMessagePhoto(userIdFrom, url, msgId)
            }).toThrow(TypeError(userIdFrom + ' is not a string'))
        })

        it('should fail on numeric userIdFrom', () => {
            const userIdFrom = 123
            const url = "test-url"

            expect(() => {
                logic.uploadMessagePhoto(userIdFrom, url, msgId)
            }).toThrow(TypeError(userIdFrom + ' is not a string'))
        })

        it('should fail on boolean userIdFrom', () => {
            const userIdFrom = true
            const url = "test-url"

            expect(() => {
                logic.uploadMessagePhoto(userIdFrom, url, msgId)
            }).toThrow(TypeError(userIdFrom + ' is not a string'))
        })

        it('should fail on object userIdFrom', () => {
            const userIdFrom = {}
            const url = "test-url"

            expect(() => {
                logic.uploadMessagePhoto(userIdFrom, url, msgId)
            }).toThrow(TypeError(userIdFrom + ' is not a string'))
        })

        it('should fail on array userIdFrom', () => {
            const userIdFrom = []
            const url = "test-url"

            expect(() => {
                logic.uploadMessagePhoto(userIdFrom, url, msgId)
            }).toThrow(TypeError(userIdFrom + ' is not a string'))
        })

        it('should fail on empty userIdFrom', () => {
            const userIdFrom = ``
            const url = "test-url"

            expect(() => {
                logic.uploadMessagePhoto(userIdFrom, url, msgId)
            }).toThrow(Error('userId is empty or blank'))
        })

        it('should fail on undefined url', () => {
            const url = undefined

            expect(() => {
                logic.uploadMessagePhoto(userIdFrom, url, msgId)
            }).toThrow(TypeError(url + ' is not a string'))
        })

        it('should fail on numeric url', () => {
            const url = 123

            expect(() => {
                logic.uploadMessagePhoto(userIdFrom, url, msgId)
            }).toThrow(TypeError(url + ' is not a string'))
        })

        it('should fail on boolean url', () => {
            const url = true

            expect(() => {
                logic.uploadMessagePhoto(userIdFrom, url, msgId)
            }).toThrow(TypeError(url + ' is not a string'))
        })

        it('should fail on object url', () => {
            const url = {}

            expect(() => {
                logic.uploadMessagePhoto(userIdFrom, url, msgId)
            }).toThrow(TypeError(url + ' is not a string'))
        })

        it('should fail on array url', () => {
            const url = []

            expect(() => {
                logic.uploadMessagePhoto(userIdFrom, url, msgId)
            }).toThrow(TypeError(url + ' is not a string'))
        })

        it('should fail on empty url', () => {
            const url = ``

            expect(() => {
                logic.uploadMessagePhoto(userIdFrom, url, msgId)
            }).toThrow(Error('url is empty or blank'))
        })

        it('should fail on undefined msgId', () => {
            const msgId = undefined
            const url = "test-url"

            expect(() => {
                logic.uploadMessagePhoto(userIdFrom, url, msgId)
            }).toThrow(TypeError(msgId + ' is not a string'))
        })

        it('should fail on numeric msgId', () => {
            const msgId = 123
            const url = "test-url"

            expect(() => {
                logic.uploadMessagePhoto(userIdFrom, url, msgId)
            }).toThrow(TypeError(msgId + ' is not a string'))
        })

        it('should fail on boolean msgId', () => {
            const msgId = true
            const url = "test-url"

            expect(() => {
                logic.uploadMessagePhoto(userIdFrom, url, msgId)
            }).toThrow(TypeError(msgId + ' is not a string'))
        })

        it('should fail on object msgId', () => {
            const msgId = {}
            const url = "test-url"

            expect(() => {
                logic.uploadMessagePhoto(userIdFrom, url, msgId)
            }).toThrow(TypeError(msgId + ' is not a string'))
        })

        it('should fail on array msgId', () => {
            const msgId = []
            const url = "test-url"

            expect(() => {
                logic.uploadMessagePhoto(userIdFrom, url, msgId)
            }).toThrow(TypeError(msgId + ' is not a string'))
        })

        it('should fail on empty msgId', () => {
            const msgId = ``
            const url = "test-url"

            expect(() => {
                logic.uploadMessagePhoto(userIdFrom, url, msgId)
            }).toThrow(Error('msgId is empty or blank'))
        })

        it('should succeed on correct input', () => {
            flareApi.uploadMessagePhoto(token, data, msgId.toString())
                .then((message) => {
                    expect(message).toBeDefined()
                    expect(message.image).toBe('test data')
                })
        })

        it('should fail on wrong msgId', () => {
            const msgId = "897ge9vvn9f87rfef70n9"

            flareApi.uploadMessagePhoto(token, data, msgId)
                .catch(({ message }) => {
                    expect(message).toBeDefined()
                    expect(message).toBe(`Cast to ObjectId failed for value \"${msgId}\" at path \"_id\" for model \"Message\"`)
                })
        })
    })

    describe('update user photo', () => {
        let name = 'carlos'
        let surname = 'perez'
        let email = `carlosperez-${Math.random()}@mail.com`
        let password = `123-${Math.random()}`

        let userId
        let url = 'test url'

        beforeEach(async () => {
   
            const hash1 = await bcrypt.hash(password, 10)

            let { id } = await User.create({ name, surname, email, password: hash1 })

            userId = id
        })

        it('should fail on undefined userId', () => {
            const userId = undefined

            expect(() => {
                logic.updateUserPhoto(userId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on numeric userId', () => {
            const userId = 123

            expect(() => {
                logic.updateUserPhoto(userId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })


        it('should fail on boolean userId', () => {
            const userId = true

            expect(() => {
                logic.updateUserPhoto(userId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on object userId', () => {
            const userId = {}

            expect(() => {
                logic.updateUserPhoto(userId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on array userId', () => {
            const userId = []

            expect(() => {
                logic.updateUserPhoto(userId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on empty userId', () => {
            const userId = ``

            expect(() => {
                logic.updateUserPhoto(userId)
            }).toThrow(Error('userId is empty or blank'))
        })

        it('should fail on undefined url', () => {
            const url = undefined

            expect(() => {
                logic.updateUserPhoto(userId, url)
            }).toThrow(TypeError(url + ' is not a string'))
        })

        it('should fail on numeric url', () => {
            const url = 123

            expect(() => {
                logic.updateUserPhoto(userId, url)
            }).toThrow(TypeError(url + ' is not a string'))
        })

        it('should fail on boolean url', () => {
            const url = true

            expect(() => {
                logic.updateUserPhoto(userId, url)
            }).toThrow(TypeError(url + ' is not a string'))
        })

        it('should fail on object url', () => {
            const url = {}

            expect(() => {
                logic.updateUserPhoto(userId, url)
            }).toThrow(TypeError(url + ' is not a string'))
        })

        it('should fail on array url', () => {
            const url = []

            expect(() => {
                logic.updateUserPhoto(userId, url)
            }).toThrow(TypeError(url + ' is not a string'))
        })

        it('should fail on empty url', () => {
            const url = ``

            expect(() => {
                logic.updateUserPhoto(userId, url)
            }).toThrow(Error('url is empty or blank'))
        })

        it('should succeed on correct input', () => {
            logic.updateUserPhoto(userId, url)
                .then(user => {
                    expect(user).toBeDefined()
                    expect(user.image).toBe('test url')
                })
        })

        it('should fail on wrong userId', () => {
            let userId = 'kjhwf7we89ffhkwjh'

            logic.updateUserPhoto(userId, url)
                .catch(({ message }) => {
                    expect(message).toBeDefined()
                    expect(message).toBe(`Cast to ObjectId failed for value \"${userId}\" at path \"_id\" for model \"User\"`)
                })
        })
    })

    describe('createMessage', () => {
        let name = 'carlos'
        let surname = 'perez'
        let email = `carlosperez-${Math.random()}@mail.com`
        let password = `123-${Math.random()}`

        let _name = 'pepe'
        let _surname = 'gomez'
        let _email = `pepegomez-${Math.random()}@mail.com`
        let _password = `123-${Math.random()}`

        let launchDate = '2019-03-21'
        let position = [40.2345, 2.4365]
        let text = 'sample message text'

        let userIdFrom
        let userIdTo

        beforeEach(async () => {
   
            const hash1 = await bcrypt.hash(password, 10)

            let { id } = await User.create({ name, surname, email, password: hash1 })

            userIdFrom = id

            const hash2 = await bcrypt.hash(_password, 10)

            let user = await User.create({ name: _name, surname: _surname, email: _email, password: hash2 })

            userIdTo =  user.id
        })

        it('should fail on undefined userIdFrom', () => {
            const userIdFrom = undefined

            expect(() => {
                logic.createMessage(userIdFrom, userIdTo, launchDate, position, text)
            }).toThrow(TypeError(userIdFrom + ' is not a string'))
        })

        it('should fail on numeric userIdFrom', () => {
            const userIdFrom = 123

            expect(() => {
                logic.createMessage(userIdFrom, userIdTo, launchDate, position, text)
            }).toThrow(TypeError(userIdFrom + ' is not a string'))
        })

        it('should fail on boolean userIdFrom', () => {
            const userIdFrom = true

            expect(() => {
                logic.createMessage(userIdFrom, userIdTo, launchDate, position, text)
            }).toThrow(TypeError(userIdFrom + ' is not a string'))
        })

        it('should fail on object userIdFrom', () => {
            const userIdFrom = {}

            expect(() => {
                logic.createMessage(userIdFrom, userIdTo, launchDate, position, text)
            }).toThrow(TypeError(userIdFrom + ' is not a string'))
        })

        it('should fail on array userIdFrom', () => {
            const userIdFrom = []

            expect(() => {
                logic.createMessage(userIdFrom, userIdTo, launchDate, position, text)
            }).toThrow(TypeError(userIdFrom + ' is not a string'))
        })

        it('should fail on empty userIdFrom', () => {
            const userIdFrom = ``

            expect(() => {
                logic.createMessage(userIdFrom, userIdTo, launchDate, position, text)
            }).toThrow(Error('userIdFrom is empty or blank'))
        })

        it('should fail on undefined userIdTo', () => {
            const userIdTo = undefined

            expect(() => {
                logic.createMessage(userIdFrom, userIdTo, launchDate, position, text)
            }).toThrow(TypeError(userIdTo + ' is not a string'))
        })

        it('should fail on numeric userIdTo', () => {
            const userIdTo = 123

            expect(() => {
                logic.createMessage(userIdFrom, userIdTo, launchDate, position, text)
            }).toThrow(TypeError(userIdTo + ' is not a string'))
        })

        it('should fail on boolean userIdTo', () => {
            const userIdTo = true

            expect(() => {
                logic.createMessage(userIdFrom, userIdTo, launchDate, position, text)
            }).toThrow(TypeError(userIdTo + ' is not a string'))
        })

        it('should fail on object uerIdTo', () => {
            const userIdTo = {}

            expect(() => {
                logic.createMessage(userIdFrom, userIdTo, launchDate, position, text)
            }).toThrow(TypeError(userIdTo + ' is not a string'))
        })

        it('should fail on array userIdTo', () => {
            const userIdTo = []

            expect(() => {
                logic.createMessage(userIdFrom, userIdTo, launchDate, position, text)
            }).toThrow(TypeError(userIdTo + ' is not a string'))
        })

        it('should fail on empty userIdTo', () => {
            const userIdTo = ``

            expect(() => {
                logic.createMessage(userIdFrom, userIdTo, launchDate, position, text)
            }).toThrow(Error('userIdTo is empty or blank'))
        })

        it('should fail on undefined launchDate', () => {
            const launchDate = undefined

            expect(() => {
                logic.createMessage(userIdFrom, userIdTo, launchDate, position, text)
            }).toThrow(TypeError(launchDate + ' is not a string'))
        })

        it('should fail on numeric launchDate', () => {
            const launchDate = 123

            expect(() => {
                logic.createMessage(userIdFrom, userIdTo, launchDate, position, text)
            }).toThrow(TypeError(launchDate + ' is not a string'))
        })

        it('should fail on boolean launchDate', () => {
            const launchDate = true

            expect(() => {
                logic.createMessage(userIdFrom, userIdTo, launchDate, position, text)
            }).toThrow(TypeError(launchDate + ' is not a string'))
        })

        it('should fail on object launchDate', () => {
            const launchDate = {}

            expect(() => {
                logic.createMessage(userIdFrom, userIdTo, launchDate, position, text)
            }).toThrow(TypeError(launchDate + ' is not a string'))
        })

        it('should fail on array launchDate', () => {
            const launchDate = []

            expect(() => {
                logic.createMessage(userIdFrom, userIdTo, launchDate, position, text)
            }).toThrow(TypeError(launchDate + ' is not a string'))
        })

        it('should fail on empty launchDate', () => {
            const launchDate = ``

            expect(() => {
                logic.createMessage(userIdFrom, userIdTo, launchDate, position, text)
            }).toThrow(Error('launchDate is empty or blank'))
        })

        it('should fail on undefined position', () => {
            const position = undefined

            expect(() => {
                logic.createMessage(userIdFrom, userIdTo, launchDate, position, text)
            }).toThrow(TypeError(position + ' is not an array'))
        })

        it('should fail on numeric position', () => {
            const position = 123

            expect(() => {
                logic.createMessage(userIdFrom, userIdTo, launchDate, position, text)
            }).toThrow(TypeError(position + ' is not an array'))
        })

        it('should fail on boolean position', () => {
            const position = true

            expect(() => {
                logic.createMessage(userIdFrom, userIdTo, launchDate, position, text)
            }).toThrow(TypeError(position + ' is not an array'))
        })

        it('should fail on object position', () => {
            const position = {}

            expect(() => {
                logic.createMessage(userIdFrom, userIdTo, launchDate, position, text)
            }).toThrow(TypeError(position + ' is not an array'))
        })

        it('should fail on empty position', () => {
            const position = ``

            expect(() => {
                logic.createMessage(userIdFrom, userIdTo, launchDate, position, text)
            }).toThrow(Error(' is not an array'))
        })

        it('should fail on undefined text', () => {
            const text = undefined

            expect(() => {
                logic.createMessage(userIdFrom, userIdTo, launchDate, position, text)
            }).toThrow(TypeError(text + ' is not a string'))
        })

        it('should fail on numeric text', () => {
            const text = 123

            expect(() => {
                logic.createMessage(userIdFrom, userIdTo, launchDate, position, text)
            }).toThrow(TypeError(text + ' is not a string'))
        })

        it('should fail on boolean text', () => {
            const text = true

            expect(() => {
                logic.createMessage(userIdFrom, userIdTo, launchDate, position, text)
            }).toThrow(TypeError(text + ' is not a string'))
        })

        it('should fail on object text', () => {
            const text = {}

            expect(() => {
                logic.createMessage(userIdFrom, userIdTo, launchDate, position, text)
            }).toThrow(TypeError(text + ' is not a string'))
        })

        it('should fail on array text', () => {
            const text = []

            expect(() => {
                logic.createMessage(userIdFrom, userIdTo, launchDate, position, text)
            }).toThrow(TypeError(text + ' is not a string'))
        })

        it('should fail on empty text', () => {
            const text = ``

            expect(() => {
                logic.createMessage(userIdFrom, userIdTo, launchDate, position, text)
            }).toThrow(Error('text is empty or blank'))
        })

        it('should succeed on correct userId', () => {
            return logic.createMessage(userIdFrom, userIdTo, launchDate, position, text)
                .then((message) => {
                    expect(message).toBeDefined()
                    expect(message instanceof Object).toBeTruthy()
                })
            })
    })

    describe('messageRead', () => {
        let name = 'carlos'
        let surname = 'perez'
        let email = `carlosperez-${Math.random()}@mail.com`
        let password = `123-${Math.random()}`

        let _name = 'pepe'
        let _surname = 'gomez'
        let _email = `pepegomez-${Math.random()}@mail.com`
        let _password = `123-${Math.random()}`

        let launchDate = '2019-03-21'
        let position = [40.2345, 2.4365]
        let text = 'sample message text'

        let userIdFrom
        let userIdTo
        let msgId

        beforeEach(async () => {
   
            const hash1 = await bcrypt.hash(password, 10)

            let { id } = await User.create({ name, surname, email, password: hash1 })

            userIdFrom = id

            const hash2 = await bcrypt.hash(_password, 10)

            let user = await User.create({ name: _name, surname: _surname, email: _email, password: hash2 })

            userIdTo =  user.id

            const { _id } = await Message.create({userIdFrom, userIdTo, launchDate, position, text})

            msgId = _id

            const addUserFrom = await User.findByIdAndUpdate(userIdFrom, { msgSent: _id })

            const addUserTo = await User.findByIdAndUpdate(userIdTo, { msgReceived: _id })
        })

        it('should fail on undefined userId', () => {
            const userId = undefined

            expect(() => {
                logic.messageRead(userId, msgId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on numeric userId', () => {
            const userId = 123

            expect(() => {
                logic.messageRead(userId, msgId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on boolean userId', () => {
            const userId = true

            expect(() => {
                logic.messageRead(userId, msgId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on object userId', () => {
            const userId = {}

            expect(() => {
                logic.messageRead(userId, msgId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on array userId', () => {
            const userId = []

            expect(() => {
                logic.messageRead(userId, msgId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on empty userId', () => {
            const userId = ``

            expect(() => {
                logic.messageRead(userId, msgId)
            }).toThrow(Error('userIdTo is empty or blank'))
        })

        it('should fail on undefined msgId', () => {
            const msgId = undefined

            expect(() => {
                logic.messageRead(userIdTo, msgId)
            }).toThrow(TypeError(msgId + ' is not a string'))
        })

        it('should fail on numeric msgId', () => {
            const msgId = 123

            expect(() => {
                logic.messageRead(userIdTo, msgId)
            }).toThrow(TypeError(msgId + ' is not a string'))
        })

        it('should fail on boolean msgId', () => {
            const msgId = true

            expect(() => {
                logic.messageRead(userIdTo, msgId)
            }).toThrow(TypeError(msgId + ' is not a string'))
        })

        it('should fail on object msgId', () => {
            const msgId = {}

            expect(() => {
                logic.messageRead(userIdTo, msgId)
            }).toThrow(TypeError(msgId + ' is not a string'))
        })

        it('should fail on array msgId', () => {
            const msgId = []

            expect(() => {
                logic.messageRead(userIdTo, msgId)
            }).toThrow(TypeError(msgId + ' is not a string'))
        })

        it('should fail on empty msgId', () => {
            const msgId = ``

            expect(() => {
                logic.messageRead(userIdTo, msgId)
            }).toThrow(Error('msgId is empty or blank'))
        })

        it('should succeed on correct userId and msgId', () => {
            return logic.messageRead(userIdTo, msgId.toString())
                .then((response) => {
                    expect(response).toBeDefined()
                    expect(response instanceof Object).toBeTruthy()
                    expect(response).toEqual({status: 'OK'})
                })
            })
    })

    describe('messageDelete', () => {
        let name = 'carlos'
        let surname = 'perez'
        let email = `carlosperez-${Math.random()}@mail.com`
        let password = `123-${Math.random()}`

        let _name = 'pepe'
        let _surname = 'gomez'
        let _email = `pepegomez-${Math.random()}@mail.com`
        let _password = `123-${Math.random()}`

        let launchDate = '2019-03-21'
        let position = [40.2345, 2.4365]
        let text = 'sample message text'

        let userIdFrom
        let userIdTo
        let msgId

        beforeEach(async () => {
   
            const hash1 = await bcrypt.hash(password, 10)

            let { id } = await User.create({ name, surname, email, password: hash1 })

            userIdFrom = id

            const hash2 = await bcrypt.hash(_password, 10)

            let user = await User.create({ name: _name, surname: _surname, email: _email, password: hash2 })

            userIdTo =  user.id

            const { _id } = await Message.create({userIdFrom, userIdTo, launchDate, position, text})

            msgId = _id

            const addUserFrom = await User.findByIdAndUpdate(userIdFrom, { msgSent: _id })

            const addUserTo = await User.findByIdAndUpdate(userIdTo, { msgReceived: _id })
        })

        it('should fail on undefined userId', () => {
            const userId = undefined

            expect(() => {
                logic.messageDelete(userId, msgId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on numeric userId', () => {
            const userId = 123

            expect(() => {
                logic.messageDelete(userId, msgId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on boolean userId', () => {
            const userId = true

            expect(() => {
                logic.messageDelete(userId, msgId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on object userId', () => {
            const userId = {}

            expect(() => {
                logic.messageDelete(userId, msgId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on array userId', () => {
            const userId = []

            expect(() => {
                logic.messageDelete(userId, msgId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on empty userId', () => {
            const userId = ``

            expect(() => {
                logic.messageDelete(userId, msgId)
            }).toThrow(Error('userId is empty or blank'))
        })

        it('should fail on undefined msgId', () => {
            const msgId = undefined

            expect(() => {
                logic.messageDelete(userIdFrom, msgId)
            }).toThrow(TypeError(msgId + ' is not a string'))
        })

        it('should fail on numeric msgId', () => {
            const msgId = 123

            expect(() => {
                logic.messageDelete(userIdFrom, msgId)
            }).toThrow(TypeError(msgId + ' is not a string'))
        })

        it('should fail on boolean msgId', () => {
            const msgId = true

            expect(() => {
                logic.messageDelete(userIdFrom, msgId)
            }).toThrow(TypeError(msgId + ' is not a string'))
        })

        it('should fail on object msgId', () => {
            const msgId = {}

            expect(() => {
                logic.messageDelete(userIdFrom, msgId)
            }).toThrow(TypeError(msgId + ' is not a string'))
        })

        it('should fail on array msgId', () => {
            const msgId = []

            expect(() => {
                logic.messageDelete(userIdFrom, msgId)
            }).toThrow(TypeError(msgId + ' is not a string'))
        })

        it('should fail on empty msgId', () => {
            const msgId = ``

            expect(() => {
                logic.messageDelete(userIdFrom, msgId)
            }).toThrow(Error('msgId is empty or blank'))
        })

        it('should succeed on correct userId and msgId', () => {
            return logic.messageDelete(userIdFrom, msgId.toString())
                .then((result) => {
                    expect(result).toBeDefined()
                    expect(result instanceof Array).toBeTruthy()
                    expect(result.length).toBe(3)
                })
            })

        it('should fail on incorrect correct msgId', () => {
            let msgId = "lijlwkjpo"

            return logic.messageDelete(userIdFrom, msgId)
                .catch(({ message }) => expect(message).toBe(`Cast to ObjectId failed for value \"${msgId}\" at path \"_id\" for model \"Message\"`))
            })
    })

    describe('retrieveReceivedMessages', () => {
        let name = 'carlos'
        let surname = 'perez'
        let email = `carlosperez-${Math.random()}@mail.com`
        let password = `123-${Math.random()}`

        let _name = 'pepe'
        let _surname = 'gomez'
        let _email = `pepegomez-${Math.random()}@mail.com`
        let _password = `123-${Math.random()}`

        let launchDate = '2019-03-21'
        let position = [40.2345, 2.4365]
        let text = 'sample message text'

        let userIdFrom
        let userIdTo

        beforeEach(async () => {
   
            const hash1 = await bcrypt.hash(password, 10)

            let { id } = await User.create({ name, surname, email, password: hash1 })

            userIdFrom = id

            const hash2 = await bcrypt.hash(_password, 10)

            let user = await User.create({ name: _name, surname: _surname, email: _email, password: hash2 })

            userIdTo =  user.id

            const { _id } = await Message.create({userIdFrom, userIdTo, launchDate, position, text})

            const addUserFrom = await User.findByIdAndUpdate(userIdFrom, { msgSent: _id })

            const addUserTo = await User.findByIdAndUpdate(userIdTo, { msgReceived: _id })
        })

        it('should fail on undefined userId', () => {
            const userId = undefined

            expect(() => {
                logic.retrieveReceivedMessages(userId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on numeric userId', () => {
            const userId = 123

            expect(() => {
                logic.retrieveReceivedMessages(userId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on boolean userId', () => {
            const userId = true

            expect(() => {
                logic.retrieveReceivedMessages(userId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on object userId', () => {
            const userId = {}

            expect(() => {
                logic.retrieveReceivedMessages(userId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on array userId', () => {
            const userId = []

            expect(() => {
                logic.retrieveReceivedMessages(userId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on empty userId', () => {
            const userId = ``

            expect(() => {
                logic.retrieveReceivedMessages(userId)
            }).toThrow(Error('userId is empty or blank'))
        })

        it('should succeed on correct userId', () => {
            return logic.retrieveReceivedMessages(userIdTo)
                .then((user) => {
                    debugger
                    expect(user).toBeDefined()
                    expect(user instanceof Object).toBeTruthy()
                    expect(user._doc.name).toBe('pepe')
                    expect(user._doc.surname).toBe('gomez')
                    expect(user._doc.msgReceived instanceof Array).toBeTruthy()
                    expect(user._doc.msgReceived.length).toBeGreaterThan(0)
                })
            })
    })

    describe('retrieveSentMessages', () => {
        let name = 'carlos'
        let surname = 'perez'
        let email = `carlosperez-${Math.random()}@mail.com`
        let password = `123-${Math.random()}`

        let _name = 'pepe'
        let _surname = 'gomez'
        let _email = `pepegomez-${Math.random()}@mail.com`
        let _password = `123-${Math.random()}`

        let launchDate = '2019-03-21'
        let position = [40.2345, 2.4365]
        let text = 'sample message text'

        let userIdFrom
        let userIdTo

        beforeEach(async () => {
   
            const hash1 = await bcrypt.hash(password, 10)

            let { id } = await User.create({ name, surname, email, password: hash1 })

            userIdFrom = id

            const hash2 = await bcrypt.hash(_password, 10)

            let user = await User.create({ name: _name, surname: _surname, email: _email, password: hash2 })

            userIdTo =  user.id

            const { _id } = await Message.create({userIdFrom, userIdTo, launchDate, position, text})

            const addUserFrom = await User.findByIdAndUpdate(userIdFrom, { msgSent: _id })

            const addUserTo = await User.findByIdAndUpdate(userIdTo, { msgReceived: _id })
        })

        it('should fail on undefined userId', () => {
            const userId = undefined

            expect(() => {
                logic.retrieveSentMessages(userId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on numeric userId', () => {
            const userId = 123

            expect(() => {
                logic.retrieveSentMessages(userId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on boolean userId', () => {
            const userId = true

            expect(() => {
                logic.retrieveSentMessages(userId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on object userId', () => {
            const userId = {}

            expect(() => {
                logic.retrieveSentMessages(userId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on array userId', () => {
            const userId = []

            expect(() => {
                logic.retrieveSentMessages(userId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on empty userId', () => {
            const userId = ``

            expect(() => {
                logic.retrieveSentMessages(userId)
            }).toThrow(Error('userId is empty or blank'))
        })

        it('should succeed on correct userId', () => {
            return logic.retrieveSentMessages(userIdFrom)
                .then((user) => {
                    debugger
                    expect(user).toBeDefined()
                    expect(user instanceof Object).toBeTruthy()
                    expect(user._doc.name).toBe('carlos')
                    expect(user._doc.surname).toBe('perez')
                    expect(user._doc.msgSent instanceof Array).toBeTruthy()
                    expect(user._doc.msgSent.length).toBeGreaterThan(0)
                })
            })
    })

    describe('retrieveAllMessages', () => {
        let name = 'carlos'
        let surname = 'perez'
        let email = `carlosperez-${Math.random()}@mail.com`
        let password = `123-${Math.random()}`

        let _name = 'pepe'
        let _surname = 'gomez'
        let _email = `pepegomez-${Math.random()}@mail.com`
        let _password = `123-${Math.random()}`

        let launchDate = '2019-03-21'
        let position = [40.2345, 2.4365]
        let text = 'sample message text'

        let userIdFrom
        let userIdTo

        beforeEach(async () => {
   
            const hash1 = await bcrypt.hash(password, 10)

            let { id } = await User.create({ name, surname, email, password: hash1 })

            userIdFrom = id

            const hash2 = await bcrypt.hash(_password, 10)

            let user = await User.create({ name: _name, surname: _surname, email: _email, password: hash2 })

            userIdTo =  user.id

            const message = await Message.create({userIdFrom, userIdTo, launchDate, position, text})
        })

        it('should fail on undefined userId', () => {
            const userId = undefined

            expect(() => {
                logic.retrieveAllMessages(userId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on numeric userId', () => {
            const userId = 123

            expect(() => {
                logic.retrieveAllMessages(userId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on boolean userId', () => {
            const userId = true

            expect(() => {
                logic.retrieveAllMessages(userId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on object userId', () => {
            const userId = {}

            expect(() => {
                logic.retrieveAllMessages(userId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on array userId', () => {
            const userId = []

            expect(() => {
                logic.retrieveAllMessages(userId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on empty userId', () => {
            const userId = ``

            expect(() => {
                logic.retrieveAllMessages(userId)
            }).toThrow(Error('userId is empty or blank'))
        })

        it('should succeed on correct userId', () => {
            return logic.retrieveAllMessages(userIdFrom)
                .then((messages) => {
                    expect(messages).toBeDefined()
                    expect(messages instanceof Array).toBeTruthy()
                    expect(messages.length).toBeGreaterThan(0)
                })
            })
    })

    after(() =>
        Promise.all([
            Message.deleteMany(),
            User.deleteMany()
        ])
            .then(() => mongoose.disconnect())
    )
})


