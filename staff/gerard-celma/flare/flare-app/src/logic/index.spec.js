require('dotenv').config()

const { mongoose, models: { User, Message } } = require('datify')
const { env: { REACT_APP_TEST_DB_URL } } = process

import logic from './index.js'
import flareApi from '../flare-api/index.js'


describe('logic', () => {
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
        const password = 'iufhfiwuyf'
        const passwordConfirmation = 'iufhfiwuyf'
        let email

        beforeEach(() => {
            email = `carlosperez-${Math.random()}@mail.com`
        })

        it('should fail on undefined name', () => {
            const name = undefined

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirmation)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on numeric name', () => {
            const name = 10

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirmation)
            }).toThrow(TypeError(name + ' is not a string'))
        })


        it('should fail on boolean name', () => {
            const name = true

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirmation)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on object name', () => {
            const name = {}

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirmation)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on array name', () => {
            const name = []

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirmation)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on empty name', () => {
            const name = ''

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirmation)
            }).toThrow(Error('name is empty or blank'))
        })

        it('should fail on undefined surname', () => {
            const surname = undefined

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirmation)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on numeric surname', () => {
            const surname = 10

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirmation)
            }).toThrow(TypeError(surname + ' is not a string'))
        })


        it('should fail on boolean surname', () => {
            const surname = true

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirmation)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on object surname', () => {
            const surname = {}

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirmation)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on array surname', () => {
            const surname = []

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirmation)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on empty surname', () => {
            const surname = ''

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirmation)
            }).toThrow(Error('surname is empty or blank'))
        })

        it('should fail on undefined email', () => {
            const email = undefined

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirmation)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on numeric email', () => {
            const email = 10

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirmation)
            }).toThrow(TypeError(email + ' is not a string'))
        })


        it('should fail on boolean email', () => {
            const email = true

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirmation)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on object email', () => {
            const email = {}

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirmation)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on array email', () => {
            const email = []

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirmation)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on empty email', () => {
            const email = ''

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirmation)
            }).toThrow(Error('email is empty or blank'))
        })

        it('should fail on undefined password', () => {
            const password = undefined

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirmation)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on numeric password', () => {
            const password = 10

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirmation)
            }).toThrow(TypeError(password + ' is not a string'))
        })


        it('should fail on boolean password', () => {
            const password = true

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirmation)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on object password', () => {
            const password = {}

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirmation)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on array password', () => {
            const password = []

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirmation)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on empty password', () => {
            const password = ''

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirmation)
            }).toThrow(Error('password is empty or blank'))
        })

        it('should fail on undefined passwordConfirmation', () => {
            const passwordConfirmation = undefined

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirmation)
            }).toThrow(TypeError(passwordConfirmation + ' is not a string'))
        })

        it('should fail on numeric passwordConfirmation', () => {
            const passwordConfirmation = 10

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirmation)
            }).toThrow(TypeError(passwordConfirmation + ' is not a string'))
        })


        it('should fail on boolean passwordConfirmation', () => {
            const passwordConfirmation = true

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirmation)
            }).toThrow(TypeError(passwordConfirmation + ' is not a string'))
        })

        it('should fail on object passwordConfirmation', () => {
            const passwordConfirmation = {}

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirmation)
            }).toThrow(TypeError(passwordConfirmation + ' is not a string'))
        })

        it('should fail on array passwordConfirmation', () => {
            const passwordConfirmation = []

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirmation)
            }).toThrow(TypeError(passwordConfirmation + ' is not a string'))
        })

        it('should fail on empty passwordConfirmation', () => {
            const passwordConfirmation = ''

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirmation)
            }).toThrow(Error('passwordConfirmation is empty or blank'))
        })

        it('should fail on password not equal to passwordConfirmation', () => {
            const passwordConfirmation = 'oirhfo3ifj'

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirmation)
            }).toThrow(Error('passwords do not match'))
        })

        it('should succeed on correct data', () => {
            return logic.registerUser(name, surname, email, password, passwordConfirmation)
                    .then(res => {
                        expect(res).toBeDefined()
                    })
        })
    })

    describe('logInUser', () => {
        const name = 'carlos'
        const surname = 'perez'
        const password = 'iufhfiwuyf'
        const passwordConfirmation = 'iufhfiwuyf'
        let email

        beforeEach(() => {
            email = `carlosperez-${Math.random()}@mail.com`
            return flareApi.registerUser(name, surname, email, password, passwordConfirmation)
        })

        it('should fail on undefined email', () => {
            const email = undefined

            expect(() => {
                logic.logInUser(email, password)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on numeric email', () => {
            const email = 10

            expect(() => {
                logic.logInUser(email, password)
            }).toThrow(TypeError(email + ' is not a string'))
        })


        it('should fail on boolean email', () => {
            const email = true

            expect(() => {
                logic.logInUser(email, password)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on object email', () => {
            const email = {}

            expect(() => {
                logic.logInUser(email, password)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on array email', () => {
            const email = []

            expect(() => {
                logic.logInUser(email, password)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on empty email', () => {
            const email = ''

            expect(() => {
                logic.logInUser(email, password)
            }).toThrow(Error('email is empty or blank'))
        })

        it('should fail on undefined password', () => {
            const password = undefined

            expect(() => {
                logic.logInUser(email, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on numeric password', () => {
            const password = 10

            expect(() => {
                logic.logInUser(email, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })


        it('should fail on boolean password', () => {
            const password = true

            expect(() => {
                logic.logInUser(email, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on object password', () => {
            const password = {}

            expect(() => {
                logic.logInUser(email, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on array password', () => {
            const password = []

            expect(() => {
                logic.logInUser(email, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on empty password', () => {
            const password = ''

            expect(() => {
                logic.logInUser(email, password)
            }).toThrow(Error('password is empty or blank'))
        })

        it('should succeed on correct data', () => {
            logic.logInUser(email, password)
                .then(({ token }) => {
                    expect(token).toBeDefined()
                    expect(token instanceof 'string').toBeTruthy()
                })
        })
    })

    describe('check user is logged in', () => {
        let name = 'carlos'
        let surname = 'perez'
        let email = `carlosperez@mail.com`
        let password = 'iufhfiwuyf'
        let passwordConfirmation = 'iufhfiwuyf'

        beforeEach(() =>
            flareApi.registerUser(name, surname, `carlosperez@mail.com`, 'iufhfiwuyf', 'iufhfiwuyf')
                .then(() => flareApi.authenticateUser(`carlosperez@mail.com`, 'iufhfiwuyf'))
                .then(({token}) => logic.__userApiToken__ = token)
        )

        it('should succeed on correct credentials', () => {
            return logic.logInUser('carlosperez@mail.com', 'iufhfiwuyf')
                .then(() => expect(logic.isUserLoggedIn).toBeTruthy())
        })
    })

    describe('update user', () => {
        let name = 'carlos'
        let surname = 'perez'
        let email 
        let password = 'iufhfiwuyf'
        let passwordConfirmation = 'iufhfiwuyf'

        beforeEach(() => {
            email = `carlosperez-${Math.random()}@mail.com`
            return flareApi.registerUser(name, surname, email, password, passwordConfirmation)
                        .then(() => flareApi.authenticateUser(email, password))
                            .then(({ token }) => logic.__userApiToken__ = token)
        })

        it('should fail on undefined name', () => {
            const name = undefined

            expect(() => {
                logic.updateUser(name, surname, email)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on numeric name', () => {
            const name = 10

            expect(() => {
                logic.updateUser(name, surname, email)
            }).toThrow(TypeError(name + ' is not a string'))
        })


        it('should fail on boolean name', () => {
            const name = true

            expect(() => {
                logic.updateUser(name, surname, email)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on object name', () => {
            const name = {}

            expect(() => {
                logic.updateUser(name, surname, email)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on array name', () => {
            const name = []

            expect(() => {
                logic.updateUser(name, surname, email)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on empty name', () => {
            const name = ''

            expect(() => {
                logic.updateUser(name, surname, email)
            }).toThrow(Error('name is empty or blank'))
        })
    
        it('should fail on undefined surname', () => {
            const surname = undefined

            expect(() => {
                logic.updateUser(name, surname, email)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on numeric surname', () => {
            const surname = 10

            expect(() => {
                logic.updateUser(name, surname, email)
            }).toThrow(TypeError(surname + ' is not a string'))
        })


        it('should fail on boolean surname', () => {
            const surname = true

            expect(() => {
                logic.updateUser(name, surname, email)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on object surname', () => {
            const surname = {}

            expect(() => {
                logic.updateUser(name, surname, email)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on array surname', () => {
            const surname = []

            expect(() => {
                logic.updateUser(name, surname, email)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on empty surname', () => {
            const surname = ''

            expect(() => {
                logic.updateUser(name, surname, email)
            }).toThrow(Error('surname is empty or blank'))
        })

        it('should fail on undefined email', () => {
            const email = undefined

            expect(() => {
                logic.updateUser(name, surname, email)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on numeric email', () => {
            const email = 10

            expect(() => {
                logic.updateUser(name, surname, email)
            }).toThrow(TypeError(email + ' is not a string'))
        })


        it('should fail on boolean email', () => {
            const email = true

            expect(() => {
                logic.updateUser(name, surname, email)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on object email', () => {
            const email = {}

            expect(() => {
                logic.updateUser(name, surname, email)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on array email', () => {
            const email = []

            expect(() => {
                logic.updateUser(name, surname, email)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on empty email', () => {
            const email = ''

            expect(() => {
                logic.updateUser(name, surname, email)
            }).toThrow(Error('email is empty or blank'))
        })

        it('should succeed on correct credentials', () => {
            return logic.updateUser(name, surname, email)
                    .then(user => {
                        expect(user).toBeDefined()
                        expect(user.name).toBe(name)
                        expect(user.surname).toBe(surname)
                        expect(user.email).toBe(email)
                    })
        })
    })

    describe('retrieve user', () => {
        let name = 'carlos'
        let surname = 'perez'
        let email 
        let password = 'iufhfiwuyf'
        let passwordConfirmation = 'iufhfiwuyf'

        beforeEach(() => {
            email = `carlosperez-${Math.random()}@mail.com`
            return flareApi.registerUser(name, surname, email, password, passwordConfirmation)
                        .then(() => flareApi.authenticateUser(email, password))
                            .then(({ token }) => logic.__userApiToken__ = token)
        })

        it('should succeed on correct credentials', () => {
            return logic.retrieveUser()
                        .then(user => {
                            expect(user).toBeDefined()
                            expect(user.name).toBe('carlos')
                            expect(user.surname).toBe('perez')
                        })
        })
    })

    describe('retrieve users', () => {
        let name = 'carlos'
        let surname = 'perez'
        let email 
        let password = 'iufhfiwuyf'
        let passwordConfirmation = 'iufhfiwuyf'

        beforeEach(() => {
            email = `carlosperez-${Math.random()}@mail.com`
            return flareApi.registerUser(name, surname, email, password, passwordConfirmation)
                        .then(() => flareApi.authenticateUser(email, password))
                            .then(({ token }) => logic.__userApiToken__ = token)
        })

        it('should succeed on correct credentials', () => {
            return logic.retrieveUsers()
                        .then(users => {
                            expect(users).toBeDefined()
                            expect(users instanceof Array).toBeTruthy()
                        })
        })
    })

    describe('uploadMessagePhoto', () => {
        let name = 'carlos'
        let surname = 'perez'
        let email 
        let password = 'iufhfiwuyf'
        let passwordConfirmation = 'iufhfiwuyf'

        let name2 = 'juan'
        let surname2 = 'gomez'
        let email2 
        let password2 = 'iot39n7f8ruf'
        let passwordConfirmation2 = 'iot39n7f8ruf'
        let userIdTo

        let data = new File(['foo', 'bar'],'name' ,[{filePropertyBag : 'foo'}])
        let launchDate = new Date().toJSON().slice(0, 10)
        let position = [40.1234, 2.9876]
        let text = 'test message'
        let msgId

        beforeEach(() => {
            email = `carlosperez-${Math.random()}@mail.com`
            email2 = `juangomez-${Math.random()}@mail.com`
            return flareApi.registerUser(name, surname, email, password, passwordConfirmation)
                        .then(() => flareApi.authenticateUser(email, password))
                            .then(({ token }) => logic.__userApiToken__ = token)
                                .then(() => flareApi.registerUser(name2, surname2, email2, password2, passwordConfirmation2))
                                    .then(id => userIdTo = id)
                                        .then(() => flareApi.createMessage(userIdTo, launchDate, position, text))
                                            .then(({ id }) => msgId = id)
        })

        it('should succeed on correct credentials', () => {
            return logic.uploadMessagePhoto(data, msgId)
                        .then(message => {
                            expect(message).toBeDefined()
                            expect(message.image).toBe('XXXX')
                        })
        })
    })

    describe('update user photo', () => {
        let name = 'carlos'
        let surname = 'perez'
        let email 
        let password = 'iufhfiwuyf'
        let passwordConfirmation = 'iufhfiwuyf'

        let data = new File(['foo', 'bar'],'name')

        beforeEach(() => {
            email = `carlosperez-${Math.random()}@mail.com`
            return flareApi.registerUser(name, surname, email, password, passwordConfirmation)
                        .then(() => flareApi.authenticateUser(email, password))
                            .then(({ token }) => logic.__userApiToken__ = token)
        })

        it('should succeed on correct credentials', () => {
            return logic.updateUserPhoto(data)
                    .then((user) => {
                        expect(user).toBeDefined()
                    })
        })
    })

    describe('create message', () => {
        let name = 'carlos'
        let surname = 'perez'
        let email 
        let password = 'iufhfiwuyf'
        let passwordConfirmation = 'iufhfiwuyf'

        let name2 = 'juan'
        let surname2 = 'gomez'
        let email2 
        let password2 = 'iot39n7f8ruf'
        let passwordConfirmation2 = 'iot39n7f8ruf'
        let userIdTo

        let launchDate = new Date().toJSON().slice(0, 10)
        let position = [40.1234, 2.9876]
        let text = 'test message'

        beforeEach(() => {
            email = `carlosperez-${Math.random()}@mail.com`
            email2 = `juangomez-${Math.random()}@mail.com`
            return flareApi.registerUser(name, surname, email, password, passwordConfirmation)
                        .then(() => flareApi.authenticateUser(email, password))
                            .then(({ token }) => logic.__userApiToken__ = token)
                                .then(() => flareApi.registerUser(name2, surname2, email2, password2, passwordConfirmation2))
                                    .then(id => userIdTo = id)
        })

        it('should succeed on correct credentials', () => {
            return logic.createMessage(userIdTo, launchDate, position, text)
                .then(message => {
                    expect(message).toBeDefined()
                    expect(message.userIdTo).toBe(userIdTo)
                    expect(message.text).toBe(text)
                    expect(message.position.toString()).toBe(position.toString())
                })
        })
    })

    describe('retrieve received messages', () => {
        let name = 'carlos'
        let surname = 'perez'
        let email 
        let password = 'iufhfiwuyf'
        let passwordConfirmation = 'iufhfiwuyf'
        let userId

        let launchDate = new Date().toJSON().slice(0, 10)
        let position = [40.1234, 2.9876]
        let text = 'test message'

        beforeEach(() => {
            email = `carlosperez-${Math.random()}@mail.com`
            return flareApi.registerUser(name, surname, email, password, passwordConfirmation)
                        .then(id => userId = id)
                        .then(() => flareApi.authenticateUser(email, password))
                            .then(({ token }) => logic.__userApiToken__ = token)
                                .then(() => logic.createMessage(userId, launchDate, position, text))
        })

        it('should succeed on correct credentials', () => {
            return logic.retrieveReceivedMessages()
                    .then(messages => {
                        expect(messages).toBeDefined()
                    })
        })
    })

    describe('retrieve sent messages', () => {
        let name = 'carlos'
        let surname = 'perez'
        let email 
        let password = 'iufhfiwuyf'
        let passwordConfirmation = 'iufhfiwuyf'
        let userId

        let launchDate = new Date().toJSON().slice(0, 10)
        let position = [40.1234, 2.9876]
        let text = 'test message'

        beforeEach(() => {
            email = `carlosperez-${Math.random()}@mail.com`
            return flareApi.registerUser(name, surname, email, password, passwordConfirmation)
                        .then(id => userId = id)
                        .then(() => flareApi.authenticateUser(email, password))
                            .then(({ token }) => logic.__userApiToken__ = token)
                                .then(() => logic.createMessage(userId, launchDate, position, text))
        })

        it('should succeed on correct credentials', () => {
            return logic.retrieveSentMessages()
                    .then(messages => {
                        expect(messages).toBeDefined()
                    })
        })
    })

    describe('retrieve all messages', () => {
        let name = 'carlos'
        let surname = 'perez'
        let email 
        let password = 'iufhfiwuyf'
        let passwordConfirmation = 'iufhfiwuyf'
        let userId

        let launchDate = new Date().toJSON().slice(0, 10)
        let position = [40.1234, 2.9876]
        let text = 'test message'

        beforeEach(() => {
            email = `carlosperez-${Math.random()}@mail.com`
            return flareApi.registerUser(name, surname, email, password, passwordConfirmation)
                        .then(id => userId = id)
                        .then(() => flareApi.authenticateUser(email, password))
                            .then(({ token }) => logic.__userApiToken__ = token)
                                .then(() => logic.createMessage(userId, launchDate, position, text))
        })

        it('should succeed on correct credentials', () => {
            return logic.retrieveAllMessages()
                    .then(messages => {
                        expect(messages).toBeDefined()
                    })
        })
    })

    describe('message read', () => {
        let name = 'carlos'
        let surname = 'perez'
        let email 
        let password = 'iufhfiwuyf'
        let passwordConfirmation = 'iufhfiwuyf'
        let userId

        let launchDate = new Date().toJSON().slice(0, 10)
        let position = [40.1234, 2.9876]
        let text = 'test message'
        let msgId

        beforeEach(() => {
            email = `carlosperez-${Math.random()}@mail.com`
            return flareApi.registerUser(name, surname, email, password, passwordConfirmation)
                        .then(id => userId = id)
                        .then(() => flareApi.authenticateUser(email, password))
                            .then(({ token }) => logic.__userApiToken__ = token)
                                .then(() => logic.createMessage(userId, launchDate, position, text))
                                    .then(({ _id }) => msgId = _id)
        })

        it('should succeed on correct credentials', () => {
            return logic.messageRead(msgId)
                    .then(messages => {
                        expect(messages).toBeDefined()
                    })
        })
    })

    describe('message delete', () => {
        let name = 'carlos'
        let surname = 'perez'
        let email 
        let password = 'iufhfiwuyf'
        let passwordConfirmation = 'iufhfiwuyf'
        let userId

        let launchDate = new Date().toJSON().slice(0, 10)
        let position = [40.1234, 2.9876]
        let text = 'test message'
        let msgId

        beforeEach(() => {
            email = `carlosperez-${Math.random()}@mail.com`
            return flareApi.registerUser(name, surname, email, password, passwordConfirmation)
                        .then(id => userId = id)
                        .then(() => flareApi.authenticateUser(email, password))
                            .then(({ token }) => logic.__userApiToken__ = token)
                                .then(() => logic.createMessage(userId, launchDate, position, text))
                                    .then(({ _id }) => msgId = _id)
        })

        it('should succeed on correct credentials', () => {
            return logic.messageDelete(msgId)
                    .then(messages => {
                        expect(messages).toBeDefined()
                    })
        })
    })

    afterAll(() =>
        Promise.all([
            Message.deleteMany(),
            User.deleteMany()
        ])
            .then(() => mongoose.disconnect())
    )
})