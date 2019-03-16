'use strict'

import coworkingApi from '.'
import bcrypt from 'bcrypt'

require('dotenv').config()

const { mongoose, models: { User, Workspace, Service } } = require('coworking-data')
const { env: { TEST_DB_URL } } = process



describe('coworkingApi', () => {
    beforeAll(() => mongoose.connect(TEST_DB_URL, { useNewUrlParser: true }))

    afterEach(() =>
        Promise.all([
            Workspace.deleteMany(),
            User.deleteMany(),
            Service.deleteMany()
        ])
    )

    describe('register user', () => {
        const name = 'Josepet'
        const surname = 'Pepet'
        const email = `josepet-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const passwordConfirm = password
        const isAdmin = false

        it('should succeed on valid data', async () => {
            const id = await coworkingApi.registerUser(name, surname, email, password, passwordConfirm)

            expect(id).toBeDefined()
            expect(typeof id).toBe('string')

            const user = await User.findOne({ email })

            expect(user.name).toBe(name)
            expect(user.surname).toBe(surname)
            expect(user.email).toBe(email)
            expect(user.isAdmin).toBe(isAdmin)

            const match = await bcrypt.compare(password, user.password)

            expect(match).toBeTruthy()
        })

        it('should fail on password and passwordConfirm not matching', () => {
            const name = 'juan'
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const passwordConfirm = `1234-${Math.random()}`

            expect(() => {
                coworkingApi.registerUser(name, surname, email, password, passwordConfirm)
            }).toThrow(TypeError('passwords do not match'))

        })

        it('should fail on already existing user', () => {
            const name = 'juan'
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`

            return coworkingApi.registerUser(name, surname, email, password, password)
                .then(() => coworkingApi.registerUser(name, surname, email, password, password))
                .catch(({ message }) => {
                    expect(message).toBe(`user with email ${email} already exists`)
                }
                )
        })

        it('should fail on undefined name', () => {
            const name = undefined

            expect(() => {
                coworkingApi.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(undefined + ' is not a string'))
        })

        it('should fail on numeric name', () => {
            const name = 10
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                coworkingApi.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(name + ' is not a string'))
        })


        it('should fail on boolean name', () => {
            const name = true
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                coworkingApi.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on object name', () => {
            const name = {}
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const isAdmin = 'false'

            expect(() => {
                coworkingApi.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on array name', () => {
            const name = []
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const isAdmin = 'false'

            expect(() => {
                coworkingApi.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on empty name', () => {
            const name = ''
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const isAdmin = 'false'

            expect(() => {
                coworkingApi.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(Error('name is empty or blank'))
        })

        it('should fail on undefined surname', () => {
            const name = 'Josepet'
            const surname = undefined
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const isAdmin = 'false'

            expect(() => {
                coworkingApi.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on numeric surname', () => {
            const name = 'Josepet'
            const surname = 10
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const isAdmin = 'false'

            expect(() => {
                coworkingApi.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on boolean surname', () => {
            const name = 'Josepet'
            const surname = false
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const isAdmin = 'false'

            expect(() => {
                coworkingApi.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on object surname', () => {
            const name = 'Josepet'
            const surname = {}
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const isAdmin = 'false'

            expect(() => {
                coworkingApi.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on array surname', () => {
            const name = 'Josepet'
            const surname = []
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const isAdmin = 'false'

            expect(() => {
                coworkingApi.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on empty surname', () => {
            const name = 'Josepet'
            const surname = ''
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const isAdmin = 'false'


            expect(() => {
                coworkingApi.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(Error('surname is empty or blank'))
        })

        it('should fail on undefined email', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = undefined
            const password = `123-${Math.random()}`
            const isAdmin = 'false'


            expect(() => {
                coworkingApi.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on numeric email', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = 10
            const password = `123-${Math.random()}`
            const isAdmin = 'false'


            expect(() => {
                coworkingApi.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on boolean email', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = false
            const password = `123-${Math.random()}`
            const isAdmin = 'false'


            expect(() => {
                coworkingApi.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on object email', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = {}
            const password = `123-${Math.random()}`
            const isAdmin = 'false'


            expect(() => {
                coworkingApi.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on array email', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = []
            const password = `123-${Math.random()}`
            const isAdmin = 'false'

            expect(() => {
                coworkingApi.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on empty email', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = ''
            const password = `123-${Math.random()}`
            const isAdmin = 'false'

            expect(() => {
                coworkingApi.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(Error('email is empty or blank'))
        })

        it('should fail on undefined password', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = undefined
            const isAdmin = 'false'

            expect(() => {
                coworkingApi.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on numeric password', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = 123
            const isAdmin = 'false'

            expect(() => {
                coworkingApi.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on boolean password', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = true
            const isAdmin = 'false'

            expect(() => {
                coworkingApi.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on object password', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = {}
            const isAdmin = 'false'

            expect(() => {
                coworkingApi.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on array password', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = []
            const isAdmin = 'false'

            expect(() => {
                coworkingApi.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on empty password', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = ''
            const isAdmin = 'false'

            expect(() => {
                coworkingApi.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(Error('password is empty or blank'))
        })
    })

    describe('authenticate user', () => {
        const name = 'Josepet'
        const surname = 'Pepet'
        const password = `123-${Math.random()}`
        const email = `josepet-${Math.random()}@mail.com`

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
        )

        it('should succeed on correct credentials', () =>
            coworkingApi.authenticateUser(email, password)
                .then(id => expect(id).toBeDefined())
        )

        it('should fail on user not found', () => {
            coworkingApi.authenticateUser('juanet@mail.com', password)
                .catch(({ message }) => expect(message).toBe('user with email juanet@mail.com not found'))
        })

        it('should fail on numeric email', () => {

            expect(() => {
                coworkingApi.authenticateUser(1234, password)
            }).toThrow(TypeError('1234 is not a string'))
        })

        it('should fail on boolean email', () => {
            const email = true

            expect(() => {
                coworkingApi.authenticateUser(true, password)
            }).toThrow(Error(true + ' is not a string'))
        })

        it('should fail on object email', () => {
            const email = {}

            expect(() => {
                coworkingApi.authenticateUser({}, password)
            }).toThrow(Error({} + ' is not a string'))
        })

        it('should fail on array email', () => {
            const email = []

            expect(() => {
                coworkingApi.authenticateUser([], password)
            }).toThrow(Error([] + ' is not a string'))
        })

        it('should fail on empty email', () => {
            const email = ''

            expect(() => {
                coworkingApi.authenticateUser(email, password)
            }).toThrow(Error('email is empty or blank'))
        })

        it('should fail on undefined password', () => {
            const password = undefined

            expect(() => {
                coworkingApi.authenticateUser(email, password)
            }).toThrow(Error(password + ' is not a string'))
        })

        it('should fail on numeric password', () => {
            const password = 123

            expect(() => {
                coworkingApi.authenticateUser(email, password)
            }).toThrow(Error(password + ' is not a string'))
        })

        it('should fail on boolean password', () => {
            const password = true

            expect(() => {
                coworkingApi.authenticateUser(email, password)
            }).toThrow(Error(password + ' is not a string'))
        })

        it('should fail on object password', () => {
            const password = {}

            expect(() => {
                coworkingApi.authenticateUser(email, password)
            }).toThrow(Error(password + ' is not a string'))
        })

        it('should fail on array password', () => {
            const password = []

            expect(() => {
                coworkingApi.authenticateUser(email, password)
            }).toThrow(Error(password + ' is not a string'))
        })

        it('should fail on empty password', () => {
            const password = ''

            expect(() => {
                coworkingApi.authenticateUser(email, password)
            }).toThrow(Error('password is empty or blank'))
        })

    })

    describe('retrieve user', () => {
        const name = 'Josepet'
        const surname = 'Pepet'
        const email = `josepet-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const isAdmin = 'false'
        let _token;

        let userId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash, isAdmin }))
                .then(({ id }) => userId = id)
                .then(() => coworkingApi.authenticateUser(email, password))
                .then(({ token }) => _token = token)
        )

        it('should succeed on correct credentials', () =>
            coworkingApi.retrieveUser(_token)
                .then(user => {
                    expect(user.id).toBe(userId)
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.email).toBe(email)

                    expect(user.save).toBeUndefined()
                    expect(user.password).toBeUndefined()
                    expect(user.__v).toBeUndefined()
                })
        )

        it('should fail on user not found', () => {
            return coworkingApi.retrieveUser('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YzhkMTg3ZTQzYzkwNjBmZDUzOWU2NzYiLCJpYXQiOjE1NTI3NTA3NDIsImV4cCI6MTU1Mjc2NTE0Mn0.oqsojHP1OWNhXSqJXjQNbIhmfezuhD-zJ_Rxd4wt4VQ')
                .catch(({ message }) => expect(message).toBe('id is not defined'))
        })

        it('should fail on undefined token', () => {
            const token = undefined

            expect(() => {
                coworkingApi.retrieveUser(token)
            }).toThrow(Error(token + ' is not a string'))
        })

        it('should fail on numeric token', () => {
            const token = 123

            expect(() => {
                coworkingApi.retrieveUser(token)
            }).toThrow(Error(token + ' is not a string'))
        })

        it('should fail on boolean token', () => {
            const token = true

            expect(() => {
                coworkingApi.retrieveUser(token)
            }).toThrow(Error(token + ' is not a string'))
        })

        it('should fail on object password', () => {
            const userId = {}

            expect(() => {
                coworkingApi.retrieveUser(userId)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on array password', () => {
            const userId = []

            expect(() => {
                coworkingApi.retrieveUser(userId)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on empty password', () => {
            const userId = ''

            expect(() => {
                coworkingApi.retrieveUser(userId)
            }).toThrow(Error('token is empty or blank'))
        })
    })

    describe('update user', () => {
        const name = 'Josepet'
        const surname = 'Pepet'
        const email = `josepet-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const isAdmin = false
        let _token

        const data = {
            name: "pepito",
            surname: "juanito"
        }
        let userId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash, isAdmin }))
                .then(({ _id }) => userId = _id)
                .then(() => coworkingApi.authenticateUser(email, password))
                .then(({ token }) => _token = token)
        )

        it('should succed on valid data', () => {

            return coworkingApi.updateUser(_token, [data])
                .then(() => User.findById(userId))
                .then(user => {
                    expect(user.name).toBe(data.name)
                    expect(user.surname).toBe(data.surname)
                    expect(user.email).toBe(email)
                    expect(user.isAdmin).toBe(isAdmin)
                })
        })
        it('should fail on undefined token', () => {
            const token = undefined

            expect(() => {
                coworkingApi.updateUser(token, data)
            }).toThrow(Error(token + ' is not a string'))
        })

        it('should fail on numeric token', () => {
            const token = 123

            expect(() => {
                coworkingApi.updateUser(token, data)
            }).toThrow(Error(token + ' is not a string'))
        })

        it('should fail on boolean token', () => {
            const token = true

            expect(() => {
                coworkingApi.updateUser(token, data)
            }).toThrow(Error(token + ' is not a string'))
        })

        it('should fail on object token', () => {
            const token = {}

            expect(() => {
                coworkingApi.updateUser(token, data)
            }).toThrow(Error(token + ' is not a string'))
        })

        it('should fail on array token', () => {
            const token = []

            expect(() => {
                coworkingApi.updateUser(token, data)
            }).toThrow(Error(token + ' is not a string'))
        })

        it('should fail on empty token', () => {
            const token = ''

            expect(() => {
                coworkingApi.updateUser(token, data)
            }).toThrow(Error('token is empty or blank'))
        })
    })

    describe('create workspace', () => {

        const name = 'Josepet'
        const surname = 'Pepet'
        const email = `josepet-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const isAdmin = 'true'
        let userId = ''
        let _token

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash, isAdmin }))
                .then(({ id }) => userId = id)
                .then(() => coworkingApi.authenticateUser(email, password))
                .then(({ token }) => _token = token)
        )

        it('should succeed on valid data', () => {

            const name = 'One Piece'

            return coworkingApi.createWorkspace(name, _token)
                .then(id => {
                    expect(id).toBeDefined()
                    expect(typeof id).toBe('string')

                    return Workspace.findById(id)
                        .then(workspace => {
                            expect(workspace._id).toBeDefined()
                            expect(workspace._id.toString()).toBe(id.toString())
                            expect(workspace.user).toContain(userId)
                        })
                })
        })

        it('should fail on user not found', () => {

            return coworkingApi.createWorkspace(name, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YzhkMTg3ZTQzYzkwNjBmZDUzOWU2NzYiLCJpYXQiOjE1NTI3NTA3NDIsImV4cCI6MTU1Mjc2NTE0Mn0.oqsojHP1OWNhXSqJXjQNbIhmfezuhD-zJ_Rxd4wt4VQ')
                .catch(({ message }) => expect(message).toBe('user does not exist'))
        })

        it('should fail on user is already in a workspace', () => {

            return coworkingApi.createWorkspace(name, _token)
                .then(() => coworkingApi.createWorkspace('potato', _token))
                .then(() => coworkingApi.createWorkspace('pepe', _token))
                .catch(({ message }) => expect(message).toBe('cannot be in more than one workspace with same email'))
        })

        it('should fail on undefined name', () => {
            const name = undefined

            expect(() => {
                coworkingApi.createWorkspace(name, _token)
            }).toThrow(Error(name + ' is not a string'))
        })

        it('should fail on numeric name', () => {
            const name = 123

            expect(() => {
                coworkingApi.createWorkspace(name, _token)
            }).toThrow(Error(name + ' is not a string'))
        })

        it('should fail on boolean name', () => {
            const name = true

            expect(() => {
                coworkingApi.createWorkspace(name, _token)
            }).toThrow(Error(name + ' is not a string'))
        })

        it('should fail on object name', () => {
            const name = {}

            expect(() => {
                coworkingApi.createWorkspace(name, _token)
            }).toThrow(Error(name + ' is not a string'))
        })

        it('should fail on array name', () => {
            const name = []

            expect(() => {
                coworkingApi.createWorkspace(name, _token)
            }).toThrow(Error(name + ' is not a string'))
        })

        it('should fail on empty name', () => {
            const name = ''

            expect(() => {
                coworkingApi.createWorkspace(name, _token)
            }).toThrow(Error('name is empty or blank'))
        })

        it('should fail on undefined token', () => {
            const token = undefined

            expect(() => {
                coworkingApi.createWorkspace(name, token)
            }).toThrow(Error(token + ' is not a string'))
        })

        it('should fail on numeric token', () => {
            const token = 123

            expect(() => {
                coworkingApi.createWorkspace(name, token)
            }).toThrow(Error(token + ' is not a string'))
        })

        it('should fail on boolean token', () => {
            const token = true

            expect(() => {
                coworkingApi.createWorkspace(name, token)
            }).toThrow(Error(token + ' is not a string'))
        })

        it('should fail on object token', () => {
            const token = {}

            expect(() => {
                coworkingApi.createWorkspace(name, token)
            }).toThrow(Error(token + ' is not a string'))
        })

        it('should fail on array token', () => {
            const token = []

            expect(() => {
                coworkingApi.createWorkspace(name, token)
            }).toThrow(Error(token + ' is not a string'))
        })

        it('should fail on empty token', () => {
            const token = ''

            expect(() => {
                coworkingApi.createWorkspace(name, token)
            }).toThrow(Error('token is empty or blank'))
        })
    })

    describe('add user to workspace', () => {

        const name = 'Josepet'
        const surname = 'Pepet'
        let email = ''
        const password = `123-${Math.random()}`
        let userId = ''
        let workspaceName = ''
        let workspaceId = ''
        let _hash = ''

        const name2 = 'Josepet'
        const surname2 = 'Pepet'
        let email2 = ''
        let userId2 = ''
        let _token


        // afterEach(()=>{
        //     Promise.all([
        //         Workspace.deleteMany(),
        //         User.deleteMany({}),
        //         Service.deleteMany()
        //     ])
        // })

        beforeEach(() => {


            email = `josepet-${Math.random()}@mail.com`
            email2 = `josepet-${Math.random()}@mail.com`
            workspaceName = `One Piece-${Math.random()}`

            return bcrypt.hash(password, 10)
                .then(hash => {
                    _hash = hash
                    return User.create({ name: name2, surname: surname2, email: email2, password: hash }).then(({ _id }) => userId2 = _id.toString())
                })
                .then(() => User.create({ name, surname, email, password: _hash }))
                .then(({ _id }) => userId = _id.toString())
                .then(() => {
                    return Workspace.create({ name: workspaceName, user: userId })
                })
                .then(({ _id }) => {
                    workspaceId = _id.toString()
                    return User.findOneAndUpdate({ id: userId, $set: { workspace: workspaceId } })
                })
                .then(() => coworkingApi.authenticateUser(email2, password))
                .then(({ token }) => _token = token)
        })

        it('should succed on valid data', () => {
            return coworkingApi.addUserToWorkspace(_token, workspaceId)
                .then(() => {
                    return Workspace.findById(workspaceId)
                })
                .then(workspace => {
                    expect(workspace._id).toBeDefined()
                    expect(workspace._id.toString()).toBe(workspaceId)
                    expect(workspace.user).toContain(userId2)
                })
        })

        it('should fail on no existing workspaceId', () => {
            const workspaceId = '5c87d473cbedf8154470ba3a'

            return coworkingApi.addUserToWorkspace(_token, workspaceId)
                .catch(({ message }) => expect(message).toBe('workspace does not exists'))
        })

        it('should fail on user already in another workspace', () => {

            return coworkingApi.addUserToWorkspace(_token, workspaceId)
                .catch(({ message }) => expect(message).toBe('user is already in a workspace'))
        })

        it('should fail on undefined workspaceId', () => {
            const workspaceId = undefined

            expect(() => {
                coworkingApi.addUserToWorkspace(_token, workspaceId)
            }).toThrow(Error(workspaceId + ' is not a string'))
        })

        it('should fail on numeric workspaceId', () => {
            const workspaceId = 123

            expect(() => {
                coworkingApi.addUserToWorkspace(_token, workspaceId)
            }).toThrow(Error(workspaceId + ' is not a string'))
        })

        it('should fail on boolean workspaceId', () => {
            const workspaceId = true

            expect(() => {
                coworkingApi.addUserToWorkspace(_token, workspaceId)
            }).toThrow(Error(workspaceId + ' is not a string'))
        })

        it('should fail on object workspaceId', () => {
            const workspaceId = {}

            expect(() => {
                coworkingApi.addUserToWorkspace(_token, workspaceId)
            }).toThrow(Error(workspaceId + ' is not a string'))
        })

        it('should fail on array workspaceId', () => {
            const workspaceId = []

            expect(() => {
                coworkingApi.addUserToWorkspace(_token, workspaceId)
            }).toThrow(Error(workspaceId + ' is not a string'))
        })

        it('should fail on empty workspaceId', () => {
            const workspaceId = ''

            expect(() => {
                coworkingApi.addUserToWorkspace(_token, workspaceId)
            }).toThrow(Error('workspaceId is empty or blank'))
        })

        it('should fail on undefined token', () => {
            const token = undefined

            expect(() => {
                coworkingApi.addUserToWorkspace(token, workspaceId)
            }).toThrow(Error(token + ' is not a string'))
        })

        it('should fail on numeric token', () => {
            const token = 123

            expect(() => {
                coworkingApi.addUserToWorkspace(token, workspaceId)
            }).toThrow(Error(token + ' is not a string'))
        })

        it('should fail on boolean token', () => {
            const token = true

            expect(() => {
                coworkingApi.addUserToWorkspace(token, workspaceId)
            }).toThrow(Error(token + ' is not a string'))
        })

        it('should fail on object token', () => {
            const token = {}

            expect(() => {
                coworkingApi.addUserToWorkspace(token, workspaceId)
            }).toThrow(Error(token + ' is not a string'))
        })

        it('should fail on array token', () => {
            const token = []

            expect(() => {
                coworkingApi.addUserToWorkspace(token, workspaceId)
            }).toThrow(Error(token + ' is not a string'))
        })

        it('should fail on empty token', () => {
            const token = ''

            expect(() => {
                coworkingApi.addUserToWorkspace(token, workspaceId)
            }).toThrow(Error('token is empty or blank'))
        })
    })

    describe('create link per new user', () => {

        const name = 'Josepet'
        const surname = 'Pepet'
        const email = `josepet-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const isAdmin = 'true'
        let userId = ''
        let _token


        beforeEach(() => {
            return bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash, isAdmin }))
                .then(({ _id }) => userId = _id.toString())
                .then(() => coworkingApi.authenticateUser(email, password))
                .then(({ token }) => _token = token)
                .then(() => coworkingApi.createWorkspace('One Piece', _token))
        })

        it('should succeed on correct data', () => {

            return coworkingApi.createNewUserLink(_token)
                .then(link => {
                    expect(link).toBeDefined()
                })

        })

        it('should fail on user does not exist', () => {
            return coworkingApi.createNewUserLink('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YzhkMTg3ZTQzYzkwNjBmZDUzOWU2NzYiLCJpYXQiOjE1NTI3NTA3NDIsImV4cCI6MTU1Mjc2NTE0Mn0.oqsojHP1OWNhXSqJXjQNbIhmfezuhD-zJ_Rxd4wt4VQ')
                .catch(({ message }) => expect(message).toBe('5c8d187e43c9060fd539e676 does not exists'))
        })


        it('should fail on undefined token', () => {
            const token = undefined

            expect(() => {
                coworkingApi.createNewUserLink(token)
            }).toThrow(Error(token + ' is not a string'))
        })

        it('should fail on numeric token', () => {
            const token = 123

            expect(() => {
                coworkingApi.createNewUserLink(token)
            }).toThrow(Error(token + ' is not a string'))
        })

        it('should fail on boolean token', () => {
            const token = true

            expect(() => {
                coworkingApi.createNewUserLink(token)
            }).toThrow(Error(token + ' is not a string'))
        })

        it('should fail on object token', () => {
            const token = {}

            expect(() => {
                coworkingApi.createNewUserLink(token)
            }).toThrow(Error(token + ' is not a string'))
        })

        it('should fail on array token', () => {
            const token = []

            expect(() => {
                coworkingApi.createNewUserLink(token)
            }).toThrow(Error(token + ' is not a string'))
        })

        it('should fail on empty token', () => {
            const token = ''

            expect(() => {
                coworkingApi.createNewUserLink(token)
            }).toThrow(Error('token is empty or blank'))
        })
    })

    describe('remove user', () => {

        const name = 'Josepet'
        const surname = 'Pepet'
        const email = `josepet-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const isAdmin = true
        let userId = ''

        const name2 = 'Josepet'
        const surname2 = 'Pepet'
        const email2 = `josepet-${Math.random()}@mail.com`
        const isAdmin2 = false
        let userId2 = ''
        let _token
        let _token2

        let workspaceId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash, isAdmin }))
                .then(({ id }) => userId = id)
                .then(() => coworkingApi.authenticateUser(email, password))
                .then(({ token }) => _token = token)
                .then(() => Workspace.create({ name: 'One piece', userId }))
                .then(({ _id }) => workspaceId = _id.toString())
                .then(() => User.create({ name: name2, surname: surname2, email: email2, password, isAdmin: isAdmin2 }))
                .then(({ id }) => userId2 = id)
                .then(() => coworkingApi.authenticateUser(email, password))
                .then(({ token }) => _token2 = token)
                .then(() => Workspace.findById(workspaceId))
                .then((workspace) => {

                    workspace.user.push(userId2)
                    workspace.user.push(userId)
                    return workspace.save()
                }).then(() => User.findById(userId2))
                .then(user => {

                    user.workspace = workspaceId
                    return user.save()
                })
                .then(() => User.findById(userId))
                .then(user => {

                    user.workspace = workspaceId
                    return user.save()
                })
        )

        it('should succed on valid data', () => {

            return coworkingApi.removeUser(_token, email2, password)
                .then(() => User.findById(userId2))
                .then(user => {

                    expect(user.name).toBe(name2)
                    expect(user.surname).toBe(surname2)
                    expect(user.email).toBe(email2)
                    expect(user.isAdmin).toBe(isAdmin2)
                    expect(user.workspace).toBeUndefined()
                })
        })

        it('should fail on trying to delete when user is no admin', () => {

            return coworkingApi.removeUser(_token2, email, password)
                .catch(({ message }) => expect(message).toBe('cannot delete if not admin'))
        })

        it('should fail on undefined token', () => {
            const token = undefined

            expect(() => {
                coworkingApi.removeUser(token, email)
            }).toThrow(Error(token + ' is not a string'))
        })

        it('should fail on numeric token', () => {
            const token = 123

            expect(() => {
                coworkingApi.removeUser(token, email)
            }).toThrow(Error(token + ' is not a string'))
        })

        it('should fail on boolean token', () => {
            const token = true

            expect(() => {
                coworkingApi.removeUser(token, email)
            }).toThrow(Error(token + ' is not a string'))
        })

        it('should fail on object token', () => {
            const token = {}

            expect(() => {
                coworkingApi.removeUser(token, email)
            }).toThrow(Error(token + ' is not a string'))
        })

        it('should fail on array token', () => {
            const token = []

            expect(() => {
                coworkingApi.removeUser(token, email)
            }).toThrow(Error(token + ' is not a string'))
        })

        it('should fail on empty token', () => {
            const token = ''

            expect(() => {
                coworkingApi.removeUser(token, email)
            }).toThrow(Error('token is empty or blank'))
        })

        it('should fail on undefined email', () => {
            const email = undefined

            expect(() => {
                coworkingApi.removeUser(_token, email)
            }).toThrow(Error(email + ' is not a string'))
        })

        it('should fail on numeric email', () => {
            const email = 123

            expect(() => {
                coworkingApi.removeUser(_token, email)
            }).toThrow(Error(email + ' is not a string'))
        })

        it('should fail on boolean email', () => {
            const email = true

            expect(() => {
                coworkingApi.removeUser(_token, email)
            }).toThrow(Error(email + ' is not a string'))
        })

        it('should fail on object email', () => {
            const email = {}

            expect(() => {
                coworkingApi.removeUser(_token, email)
            }).toThrow(Error(email + ' is not a string'))
        })

        it('should fail on array email', () => {
            const email = []

            expect(() => {
                coworkingApi.removeUser(_token, email)
            }).toThrow(Error(email + ' is not a string'))
        })

        it('should fail on empty email', () => {
            const email = ''

            expect(() => {
                coworkingApi.removeUser(_token, email)
            }).toThrow(Error('email is empty or blank'))
        })
    })

    describe('verify new user link', () => {

        const name = 'Josepet'
        const surname = 'Pepet'
        const email = `josepet-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const isAdmin = 'true'
        let userId = ''
        let link = 'id89380dhja89jds-dsakdias9dj98'
        let workspaceId
        let _token

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash, isAdmin }))
                .then(({ _id }) => userId = _id.toString())
                .then(() => coworkingApi.authenticateUser(email, password))
                .then(({ token }) => _token = token)
                .then(() => Workspace.create({ name: 'onepiece', user: userId }))
                .then(workspace => {
                    workspace.hash.push(link)
                    workspaceId = workspace._id.toString()
                    return workspace.save()
                })
        )

        it('should succed on correct data', () => {

            return coworkingApi.verifyNewUserLink(_token, link)
                .then(() => Workspace.findById(workspaceId))
                .then(workspace => {
                    expect(workspace).toBeDefined()
                    expect(workspace.name).toBe('onepiece')
                    expect(workspace.hash).toBeDefined()
                    expect(workspace.hash.toString()).toBe("")
                })
        })

        it('should fail on user does not exists', () => {

            return coworkingApi.verifyNewUserLink('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YzhkMTg3ZTQzYzkwNjBmZDUzOWU2NzYiLCJpYXQiOjE1NTI3NTA3NDIsImV4cCI6MTU1Mjc2NTE0Mn0.oqsojHP1OWNhXSqJXjQNbIhmfezuhD-zJ_Rxd4wt4VQ', link)
                .catch(({ message }) => expect(message).toBe('5c8d187e43c9060fd539e676 does not exists'))
        })

        it('should fail on link not found', () => {

            return coworkingApi.verifyNewUserLink(_token, '$2b$10$GqG1nrq74P6qZyBOUO2cfu5FMnK5ItYeJiV4nL2JUkvAhJKuOCBUS')
                .catch(({ message }) => expect(message).toBe('link validation failed'))
        })

        it('should fail on undefined token', () => {
            const token = undefined

            expect(() => {
                coworkingApi.verifyNewUserLink(token, link)
            }).toThrow(Error(token + ' is not a string'))
        })

        it('should fail on numeric token', () => {
            const token = 123

            expect(() => {
                coworkingApi.verifyNewUserLink(token, link)
            }).toThrow(Error(token + ' is not a string'))
        })

        it('should fail on boolean token', () => {
            const token = true

            expect(() => {
                coworkingApi.verifyNewUserLink(token, link)
            }).toThrow(Error(token + ' is not a string'))
        })

        it('should fail on object token', () => {
            const token = {}

            expect(() => {
                coworkingApi.verifyNewUserLink(token, link)
            }).toThrow(Error(token + ' is not a string'))
        })

        it('should fail on array userId', () => {
            const token = []

            expect(() => {
                coworkingApi.verifyNewUserLink(token, link)
            }).toThrow(Error(token + ' is not a string'))
        })

        it('should fail on empty token', () => {
            const token = ''

            expect(() => {
                coworkingApi.verifyNewUserLink(token, link)
            }).toThrow(Error('token is empty or blank'))
        })

        it('should fail on undefined link', () => {
            const link = undefined

            expect(() => {
                coworkingApi.verifyNewUserLink(_token, link)
            }).toThrow(Error(link + ' is not a string'))
        })

        it('should fail on numeric link', () => {
            const link = 123

            expect(() => {
                coworkingApi.verifyNewUserLink(_token, link)
            }).toThrow(Error(link + ' is not a string'))
        })

        it('should fail on boolean link', () => {
            const link = true

            expect(() => {
                coworkingApi.verifyNewUserLink(_token, link)
            }).toThrow(Error(link + ' is not a string'))
        })

        it('should fail on object link', () => {
            const link = {}

            expect(() => {
                coworkingApi.verifyNewUserLink(_token, link)
            }).toThrow(Error(link + ' is not a string'))
        })

        it('should fail on array link', () => {
            const link = []

            expect(() => {
                coworkingApi.verifyNewUserLink(_token, link)
            }).toThrow(Error(link + ' is not a string'))
        })

        it('should fail on empty link', () => {
            const link = ''

            expect(() => {
                coworkingApi.verifyNewUserLink(_token, link)
            }).toThrow(Error('link is empty or blank'))
        })
    })

    describe('create service', () => {
        const name = 'Josepet'
        const surname = 'Pepet'
        const email = `josepet-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const isAdmin = 'true'
        let userId = ''
        const title = 'english lesson'
        const description = 'english lessons that will help you a lot'
        let workspaceId
        let maxUsers = 3
        let place = 'here'
        let time = 30
        let _token

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash, isAdmin }))
                .then(({ _id }) => {
                    userId = _id.toString()
                    return Workspace.create({ name: 'Onepiece', user: _id })
                })
                .then(workspace => {
                    workspaceId = workspace._id.toString()
                    workspace.user.push(userId)
                    return workspace.save()
                })
                .then(() => coworkingApi.authenticateUser(email, password))
                .then(({ token }) => _token = token)
                .then(() => User.findOneAndUpdate({ id: userId, $set: { workspace: workspaceId } }))
        )

        it('should succed on correct data', () => {

            return coworkingApi.createService(_token, title, description, maxUsers, place, time)
                .then(serviceId => Service.findById(serviceId))
                .then(service => {
                    expect(service.title).toBe(title)
                    expect(service.description).toBe(description)
                    expect(service.maxUsers).toBe(maxUsers)
                    expect(service.place).toBe(place)
                    expect(service.time).toBe(time)
                })
        })

        it('should fail on user does not exists', () => {

            return coworkingApi.createService('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YzhkMTg3ZTQzYzkwNjBmZDUzOWU2NzYiLCJpYXQiOjE1NTI3NTA3NDIsImV4cCI6MTU1Mjc2NTE0Mn0.oqsojHP1OWNhXSqJXjQNbIhmfezuhD-zJ_Rxd4wt4VQ', title, description, maxUsers, place, time)
                .catch(({ message }) => expect(message).toBe('5c8d187e43c9060fd539e676 does not exists'))
        })

        it('should fail on undefined token', () => {
            const token = undefined

            expect(() => {
                coworkingApi.createService(token, title, description)
            }).toThrow(Error(token + ' is not a string'))
        })

        it('should fail on numeric token', () => {
            const token = 123

            expect(() => {
                coworkingApi.createService(token, title, description)
            }).toThrow(Error(token + ' is not a string'))
        })

        it('should fail on boolean token', () => {
            const token = true

            expect(() => {
                coworkingApi.createService(token, title, description)
            }).toThrow(Error(token + ' is not a string'))
        })

        it('should fail on object token', () => {
            const token = {}

            expect(() => {
                coworkingApi.createService(token, title, description)
            }).toThrow(Error(token + ' is not a string'))
        })

        it('should fail on array token', () => {
            const token = []

            expect(() => {
                coworkingApi.createService(token, title, description)
            }).toThrow(Error(token + ' is not a string'))
        })

        it('should fail on empty token', () => {
            const token = ''

            expect(() => {
                coworkingApi.createService(token, title, description)
            }).toThrow(Error('token is empty or blank'))
        })

        it('should fail on undefined title', () => {
            const title = undefined

            expect(() => {
                coworkingApi.createService(_token, title, description)
            }).toThrow(Error(title + ' is not a string'))
        })

        it('should fail on numeric title', () => {
            const title = 123

            expect(() => {
                coworkingApi.createService(_token, title, description)
            }).toThrow(Error(title + ' is not a string'))
        })

        it('should fail on boolean title', () => {
            const title = true

            expect(() => {
                coworkingApi.createService(_token, title, description)
            }).toThrow(Error(title + ' is not a string'))
        })

        it('should fail on object title', () => {
            const title = {}

            expect(() => {
                coworkingApi.createService(_token, title, description)
            }).toThrow(Error(title + ' is not a string'))
        })

        it('should fail on array title', () => {
            const title = []

            expect(() => {
                coworkingApi.createService(_token, title, description)
            }).toThrow(Error(title + ' is not a string'))
        })

        it('should fail on empty title', () => {
            const title = ''

            expect(() => {
                coworkingApi.createService(_token, title, description)
            }).toThrow(Error('title is empty or blank'))
        })

        it('should fail on undefined description', () => {
            const description = undefined

            expect(() => {
                coworkingApi.createService(_token, title, description)
            }).toThrow(Error(description + ' is not a string'))
        })

        it('should fail on numeric description', () => {
            const description = 123

            expect(() => {
                coworkingApi.createService(_token, title, description)
            }).toThrow(Error(description + ' is not a string'))
        })

        it('should fail on boolean description', () => {
            const description = true

            expect(() => {
                coworkingApi.createService(_token, title, description)
            }).toThrow(Error(description + ' is not a string'))
        })

        it('should fail on object description', () => {
            const description = {}

            expect(() => {
                coworkingApi.createService(_token, title, description)
            }).toThrow(Error(description + ' is not a string'))
        })

        it('should fail on array description', () => {
            const description = []

            expect(() => {
                coworkingApi.createService(_token, title, description)
            }).toThrow(Error(description + ' is not a string'))
        })

        it('should fail on empty description', () => {
            const description = ''

            expect(() => {
                coworkingApi.createService(_token, title, description)
            }).toThrow(Error('description is empty or blank'))
        })
    })

    describe('retrieve service', () => {

        const name = 'Josepet'
        const surname = 'Pepet'
        const email = `josepet-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const isAdmin = 'true'
        let userId = ''
        const title = 'english lesson'
        const description = 'english lessons that will help you a lot'
        let workspaceId
        let serviceId
        let maxUsers = 4
        let place = 'here'
        let time = 30
        let _token

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash, isAdmin }))
                .then(({ id }) => {
                    userId = id.toString()
                    return Workspace.create({ name: 'Onepiece', user: id })
                })
                .then(workspace => {
                    workspaceId = workspace._id.toString()
                    workspace.user.push(userId)
                    return workspace.save()
                })
                .then(() => User.findOneAndUpdate({ id: userId, $set: { workspace: workspaceId } }))
                .then(() => Service.create({ title, description, maxUsers, place, time, user: userId }))
                .then(({ _id }) => serviceId = _id.toString())
                .then(() => coworkingApi.authenticateUser(email, password))
                .then(({ token }) => _token = token)
        )
        it('should succed on correct data', () => {

            return coworkingApi.retrieveService(_token, serviceId)
                .then(service => {
                    expect(service).toBeDefined()
                    expect(service.title).toBe(title)
                    expect(service.description).toBe(description)
                    expect(service.maxUsers).toBe(maxUsers)
                    expect(service.place).toBe(place)
                    expect(service.time).toBe(time)
                })
        })

        it('should fail on undefined token', () => {
            const token = undefined

            expect(() => {
                coworkingApi.retrieveService(token, serviceId)
            }).toThrow(Error(token + ' is not a string'))
        })

        it('should fail on numeric token', () => {
            const token = 123

            expect(() => {
                coworkingApi.retrieveService(token, serviceId)
            }).toThrow(Error(token + ' is not a string'))
        })

        it('should fail on boolean token', () => {
            const token = true

            expect(() => {
                coworkingApi.retrieveService(token, serviceId)
            }).toThrow(Error(token + ' is not a string'))
        })

        it('should fail on object token', () => {
            const token = {}

            expect(() => {
                coworkingApi.retrieveService(token, serviceId)
            }).toThrow(Error(token + ' is not a string'))
        })

        it('should fail on array token', () => {
            const token = []

            expect(() => {
                coworkingApi.retrieveService(token, serviceId)
            }).toThrow(Error(token + ' is not a string'))
        })

        it('should fail on empty token', () => {
            const token = ''

            expect(() => {
                coworkingApi.retrieveService(token, serviceId)
            }).toThrow(Error('token is empty or blank'))
        })

        it('should fail on undefined serviceId', () => {
            const serviceId = undefined

            expect(() => {
                coworkingApi.retrieveService(_token, serviceId)
            }).toThrow(Error(serviceId + ' is not a string'))
        })

        it('should fail on numeric serviceId', () => {
            const serviceId = 123

            expect(() => {
                coworkingApi.retrieveService(_token, serviceId)
            }).toThrow(Error(serviceId + ' is not a string'))
        })

        it('should fail on boolean serviceId', () => {
            const serviceId = true

            expect(() => {
                coworkingApi.retrieveService(_token, serviceId)
            }).toThrow(Error(serviceId + ' is not a string'))
        })

        it('should fail on object serviceId', () => {
            const serviceId = {}

            expect(() => {
                coworkingApi.retrieveService(_token, serviceId)
            }).toThrow(Error(serviceId + ' is not a string'))
        })

        it('should fail on array serviceId', () => {
            const serviceId = []

            expect(() => {
                coworkingApi.retrieveService(_token, serviceId)
            }).toThrow(Error(serviceId + ' is not a string'))
        })

        it('should fail on empty serviceId', () => {
            const serviceId = ''

            expect(() => {
                coworkingApi.retrieveService(_token, serviceId)
            }).toThrow(Error('serviceId is empty or blank'))
        })
    })

    describe('retrieve user services', () => {

        const name = 'Josepet'
        const surname = 'Pepet'
        const email = `josepet-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const isAdmin = 'true'
        let userId = ''
        const title = 'english lesson'
        const description = 'english lessons that will help you a lot'
        let workspaceId
        let serviceId
        let maxUsers = 4
        let place = 'here'
        let time = 30
        let _token

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash, isAdmin }))
                .then(({ _id }) => {
                    userId = _id.toString()
                    return Workspace.create({ name: 'Onepiece', user: _id })
                })
                .then(workspace => {
                    workspaceId = workspace._id.toString()
                    workspace.user.push(userId)
                    return workspace.save()
                })
                .then(() => User.findOneAndUpdate({ _id: userId, $set: { workspace: workspaceId } }))
                .then(() => Service.create({ title, description, maxUsers, place, time, user: userId }))
                .then(({ _id }) => serviceId = _id.toString())
                .then(() => coworkingApi.authenticateUser(email, password))
                .then(({ token }) => _token = token)
        )


        it('should succed on correct data', () => {

            return coworkingApi.retrieveUserServices(_token)
                .then(_services => {
                    expect(_services).toBeDefined()
                    expect(_services).toEqual([])
                })
        })

        it('should fail on user not exists', () => {

            return coworkingApi.retrieveUserServices('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YzhkMTg3ZTQzYzkwNjBmZDUzOWU2NzYiLCJpYXQiOjE1NTI3NTA3NDIsImV4cCI6MTU1Mjc2NTE0Mn0.oqsojHP1OWNhXSqJXjQNbIhmfezuhD-zJ_Rxd4wt4VQ')
                .catch(({ message }) => expect(message).toBe('user does not exists'))
        })
    })

    describe('retrieve user submited services', () => {

        const name = 'Josepet'
        const surname = 'Pepet'
        const email = `josepet-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const isAdmin = 'true'
        let userId
        let userId2
        const title = 'english lesson'
        const description = 'english lessons that will help you a lot'
        let workspaceId
        let serviceId
        let maxUsers = 4
        let place = 'here'
        let time = 60
        let _token
        let _token2

        beforeEach(() => {

            return coworkingApi.registerUser(name, surname, email, password, password)
                .then(id => userId = id.toString())
                .then(() => coworkingApi.authenticateUser(email, password))
                .then(({ token }) => _token = token)
                .then(() => coworkingApi.createWorkspace('One piece', _token))
                .then(id => {
                    workspaceId = id.toString()
                    return Service.create({ user: userId, title, description, maxUsers, place, time })
                })
                .then(service => serviceId = service._id.toString())
                .then(() => coworkingApi.registerUser(name, surname, 'joanet@mail.com', password, password))
                .then(id => userId2 = id.toString())
                .then(() => coworkingApi.authenticateUser('joanet@mail.com', password))
                .then(({ token }) => _token2 = token)
                .then(() => coworkingApi.addUserToWorkspace(_token2, workspaceId))
                .then(() => coworkingApi.addUserToService(_token2, serviceId))

        })

        it('should succed on valid data', () => {
            return coworkingApi.retrieveUserSubmitedServices(_token2)
                .then(services => {
                    console.log(services)
                    expect(services).toBeDefined()
                    expect(services).toEqual([])
                })
        })

        it('should fail on non existing user', () => {
            return coworkingApi.retrieveUserSubmitedServices('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YzhkMTg3ZTQzYzkwNjBmZDUzOWU2NzYiLCJpYXQiOjE1NTI3NTA3NDIsImV4cCI6MTU1Mjc2NTE0Mn0.oqsojHP1OWNhXSqJXjQNbIhmfezuhD-zJ_Rxd4wt4VQ')
                .catch(({ message }) => expect(message).toBe('User does not exists'))
        })
    })

    describe('add user to service', () => {

        const name = 'Josepet'
        const surname = 'Pepet'
        const email = `josepet-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        let userId
        let userId2
        let userId3
        let userId4
        const title = 'english lesson'
        const description = 'english lessons that will help you a lot'
        let workspaceId
        let serviceId
        let maxUsers = 2
        let place = 'here'
        let time = 60
        let time2 = '-200'
        let _token
        let _token2
        let _token3
        let _token4

        beforeEach(() => {
            return coworkingApi.registerUser(name, surname, email, password, password)
                .then(id => userId = id.toString())
                .then(() => coworkingApi.authenticateUser(email, password))
                .then(({ token }) => _token = token)
                .then(() => coworkingApi.createWorkspace('One piece', _token))
                .then(id => {
                    workspaceId = id.toString()
                    return Service.create({ user: userId, title, description, maxUsers, place, time, submitedUsers: [] })
                })
                .then(service => serviceId = service._id.toString())
                .then(() => coworkingApi.registerUser(name, surname, 'joanet@mail.com', password, password))
                .then(id => userId2 = id.toString())
                .then(() => coworkingApi.authenticateUser('joanet@mail.com', password))
                .then(({ token }) => _token2 = token)
                .then(() => coworkingApi.addUserToWorkspace(_token2, workspaceId))
                .then(() => coworkingApi.registerUser(name, surname, 'joanetaaaooo@mail.com', password, password ))
                .then((id) => userId4 = id.toString())
                .then(() => coworkingApi.authenticateUser('joanetaaaooo@mail.com', password))
                .then(({ token }) => _token4 = token)
                .then(() => coworkingApi.addUserToWorkspace(_token4, workspaceId))

        })

        it('should succed on valid data', () => {

            return coworkingApi.addUserToService(_token2, serviceId)
                .then(() => coworkingApi.retrieveService(_token, serviceId))
                .then(service => {
                    expect(service).toBeDefined()
                    expect(service.id.toString()).toBe(serviceId)
                    expect(service.place).toBe(place)
                    expect(service.maxUsers).toBe(maxUsers)
                    expect(service.time).toBe(time)
                    expect(service.title).toBe(title)
                    expect(service.description).toBe(description)
                })
        })

        it('should fail on max submited users achieved', () => {

            return coworkingApi.addUserToService(_token2, serviceId)
                .then(() => coworkingApi.addUserToService(_token4, serviceId))
                .then(() => coworkingApi.addUserToService(_token4, serviceId))
                .catch(({ message }) => expect(message).toBe('max submited users achieved, you cannot submit to this event'))
        })

        it('should fail on user is aldready submited to this event', () => {

            return coworkingApi.addUserToService(_token2, serviceId)
                .then(() => coworkingApi.addUserToService(_token2, serviceId))
                .catch(({ message }) => expect(message).toBe('user is already submited to this service'))
        })

        it('should fail on user cannot submit to his own service', () => {

            return coworkingApi.addUserToService(_token, serviceId)
                .catch(({ message }) => expect(message).toBe('user cannot apply to his own service'))
        })
    })

    describe('retrieve workspace services', () => {
        const name = 'Josepet'
        const surname = 'Pepet'
        const email = `josepet-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        let userId
        const title = 'english lesson'
        const description = 'english lessons that will help you a lot'
        let serviceId
        let workspaceId
        let maxUsers = 2
        let place = 'here'
        let time = 60
        let _token

        beforeEach(() => {
            return coworkingApi.registerUser(name, surname, email, password, password)
                .then(id => userId = id.toString())
                .then(() => coworkingApi.authenticateUser(email, password))
                .then(({token})=> _token = token)
                .then( () => coworkingApi.createWorkspace('One piece', _token))
                .then(id => {
                    workspaceId = id.toString()
                    return Service.create({ user: userId, title, description, maxUsers, place, time, submitedUsers: [], workspace: workspaceId })
                })
                .then(service => serviceId = service._id.toString())
                .then(() => Workspace.findById(workspaceId))
                .then(workspace => {
                    workspace.service = [serviceId]
                    return workspace.save()
                })
        })

        it('should succeed on valid data', () => {

            return coworkingApi.retrieveWorkspaceServices(_token, workspaceId)
                .then(services => {
                    expect(services).toBeDefined()
                    expect(services[0].place).toBe(place)
                    expect(services[0].user).toBe(name)
                    expect(services[0].title).toBe(title)
                    expect(services[0].description).toBe(description)
                    expect(services[0].maxUsers).toBe(maxUsers)
                    expect(services[0].time).toBe(time)
                    expect(services[0].id.toString()).toBe(serviceId)
                })
        })

        it('should fail on workspace not existing', () => {

            return coworkingApi.retrieveWorkspaceServices(_token, '5c83d50fd800e035752e32a7')
                .catch(({ message }) => expect(message).toBe('workspace not found'))
        })
    })

    describe('close service', () => {
        const name = 'Josepet'
        const surname = 'Pepet'
        const email = `josepet-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        let userId
        const title = 'english lesson'
        const description = 'english lessons that will help you a lot'
        let serviceId
        let workspaceId
        let maxUsers = 2
        let place = 'here'
        let time = 60
        let _token

        beforeEach(() => {
            return coworkingApi.registerUser(name, surname, email, password, password)
                .then(id => userId = id.toString())
                .then(() => coworkingApi.authenticateUser(email, password))
                .then(({token}) => _token = token)
                .then(() => coworkingApi.createWorkspace('One piece', _token))
                .then(id => {
                    workspaceId = id.toString()
                    return Service.create({ user: userId, title, description, maxUsers, place, time, submitedUsers: [], workspace: workspaceId })
                })
                .then(service => serviceId = service._id.toString())
                .then(() => Workspace.findById(workspaceId))
                .then(workspace => {
                    workspace.service = [serviceId]
                    return workspace.save()
                })
        })

        it('should succed on valid data', () => {

            return coworkingApi.closeService(_token, serviceId)
                .then(service => {
                    expect(service).toBeDefined()
                })
                .then(()=> coworkingApi.retrieveService(_token, serviceId))
                .then(service => {

                    expect(service).toBeDefined()
                    expect(service.closed).toBe(true)
                    expect(service.user).toBe(name)
                    expect(service.title).toBe(title)
                    expect(service.description).toBe(description)
                    expect(service.maxUsers).toBe(maxUsers)
                    expect(service.time).toBe(time)
                    expect(service.id.toString()).toBe(serviceId)
                })
        })

        it('should fail on service not exists', () => {

            return coworkingApi.closeService( _token, '5c83d50fd800e035752e32a7')
                .catch(({message}) => expect(message).toBe('service not found'))
        })
    })

    describe('create comment', () => {
        const name = 'Josepet'
        const surname = 'Pepet'
        const email = `josepet-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        let userId
        const title = 'english lesson'
        const description = 'english lessons that will help you a lot'
        let serviceId
        let workspaceId
        let maxUsers = 2
        let place = 'here'
        let time = 60
        let text = 'me mola, muy guai'
        let _token

        beforeEach(() => {
            return coworkingApi.registerUser(name, surname, email, password, password)
                .then(id => userId = id.toString())
                .then(() => coworkingApi.authenticateUser(email, password))
                .then(({token}) => _token = token)
                .then(()=> coworkingApi.createWorkspace('One piece', _token))
                .then(id => {
                    workspaceId = id.toString()
                    return Service.create({ user: userId, title, description, maxUsers, place, time, submitedUsers: [], workspace: workspaceId })
                })
                .then(service => serviceId = service._id.toString())
                .then(() => Workspace.findById(workspaceId))
                .then(workspace => {
                    workspace.service = [serviceId]
                    return workspace.save()
                })
        })

        it('should succed on valid data', () => {

            return coworkingApi.createComment(_token, serviceId, text)
                .then(id => expect(id).toBeDefined())
                .then(() => Service.findById(serviceId))
                .then(service => {
                    expect(service._id.toString()).toBe(serviceId)
                    expect(service.user.toString()).toBe(userId)
                    expect(service.title).toBe(title)
                    expect(service.description).toBe(description)
                    expect(service.maxUsers).toBe(maxUsers)
                    expect(service.place).toBe(place)
                    expect(service.time).toBe(time)
                    expect(service.comments[0].text).toBe(text)
                    expect(service.comments[0].user.toString()).toBe(userId)
                })
        })
    })

    describe('retrieve service comments', () => {
        const name = 'Josepet'
        const surname = 'Pepet'
        const email = `josepet-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        let userId
        const title = 'english lesson'
        const description = 'english lessons that will help you a lot'
        let serviceId
        let workspaceId
        let commentId
        let maxUsers = 2
        let place = 'here'
        let time = 60
        let text = 'me mola, muy guai'
        let _token

        beforeEach(() => {
            return coworkingApi.registerUser(name, surname, email, password, password)
                .then(id => userId = id.toString())
                .then(() => coworkingApi.authenticateUser(email, password))
                .then(({token}) => _token = token)
                .then(()=> coworkingApi.createWorkspace('One piece', _token))
                .then(id => {
                    workspaceId = id.toString()
                    return Service.create({ user: userId, title, description, maxUsers, place, time, submitedUsers: [], workspace: workspaceId })
                })
                .then(service => serviceId = service._id.toString())
                .then(() => Workspace.findById(workspaceId))
                .then(workspace => {
                    workspace.service = [serviceId]
                    return workspace.save()
                })
                .then(() => coworkingApi.createComment(_token, serviceId, text))
                .then(({id}) => commentId = id.toString())
        })

        it('should succed on valid data', () => {

            return coworkingApi.retrieveWorkspaceComments(_token, serviceId)
                .then( comments => {
                    expect(comments).toBeDefined()
                    expect(comments[0].user.toString()).toBe(userId)
                    expect(comments[0].text).toBe(text)
                    expect(comments[0].id.toString()).toBe(commentId)
                })
        })

        it('should fail on service not found', () => {
            
            return coworkingApi.retrieveWorkspaceComments(_token, '5c83d50fd800e035752e32a7')
                .catch(({message}) => expect(message).toBe('service not found'))
        })
    })

    describe('remove comments', () => {
        const name = 'Josepet'
        const surname = 'Pepet'
        const email = `josepet-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        let userId
        const title = 'english lesson'
        const description = 'english lessons that will help you a lot'
        let serviceId
        let workspaceId
        let commentId
        let maxUsers = 2
        let place = 'here'
        let time = 60
        let text = 'me mola, muy guai'
        let _token

        beforeEach(() => {
            return coworkingApi.registerUser(name, surname, email, password, password)
                .then(id => userId = id.toString())
                .then(() => coworkingApi.authenticateUser(email, password))
                .then(({token}) => _token = token)
                .then(() => coworkingApi.createWorkspace('One piece', _token))
                .then(id => {
                    workspaceId = id.toString()
                    return Service.create({ user: userId, title, description, maxUsers, place, time, submitedUsers: [], workspace: workspaceId })
                })
                .then(service => serviceId = service._id.toString())
                .then(() => Workspace.findById(workspaceId))
                .then(workspace => {
                    workspace.service = [serviceId]
                    return workspace.save()
                })
                .then(() => coworkingApi.createComment(_token, serviceId, text))
                .then(({id}) => commentId = id.toString())
        })

        it('should succed on valid data', () => {

            return coworkingApi.removeComment(_token, serviceId, commentId)
                .then(() => coworkingApi.retrieveWorkspaceComments(_token, serviceId))
                .then(service => {
                    expect(service).toBeDefined()
                    expect(service).toEqual([])})
        })

        it('should fail on service not found', () => {

            return coworkingApi.removeComment(_token, '5c83d50fd800e035752e32a7', commentId)
                .catch(({message}) => expect(message).toBe('service not found'))
        })

        it('should fail on service has no comments to remove', () => {

            return coworkingApi.removeComment(_token, serviceId, commentId)
                .then(() => coworkingApi.removeComment(_token, serviceId, commentId))
                .catch(({message}) => expect(message).toBe('comment not found'))
        })
    })

    afterAll(() =>
        Promise.all([
            Product.deleteMany(),
            User.deleteMany()
        ])
            .then(() => mongoose.disconnect())
    )

})