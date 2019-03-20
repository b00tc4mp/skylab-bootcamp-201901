'use strict'

require('dotenv').config()

require('isomorphic-fetch')

const { models: { User, Workspace, Service } } = require('coworking-data')
const { mongoose } = require('coworking-data')
const expect = require('expect')
const logic = require('.')
const bcrypt = require('bcrypt')
const tokenHelper = require('../token-helper')

const { env: { TEST_DB_URL, JWT_SECRET } } = process

tokenHelper.jwtSecret = JWT_SECRET

describe('logic', () => {
    before(() => mongoose.connect(TEST_DB_URL, { useNewUrlParser: true }))

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
        const userName = 'Roronoa'

        it('should succeed on valid data', async () => {
            const id = await logic.registerUser(name, surname, userName, email, password, passwordConfirm)

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
            const userName = 'Roronoa'

            expect(() => {
                logic.registerUser(name, surname, userName, email, password, passwordConfirm)
            }).toThrow(TypeError('passwords do not match'))

        })

        it('should fail on already existing user', () => {
            const name = 'juan'
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const userName = 'Roronoa'

            return logic.registerUser(name, surname,userName, email, password, password)
                .then(() => logic.registerUser(name, surname, userName, email, password, password))
                .catch(({ message }) => {
                    expect(message).toBe(`user with email ${email} already exists`)
                }
                )
        })

        it('should fail on undefined name', () => {
            const name = undefined

            expect(() => {
                logic.registerUser(name, surname, userName, email, password, password)
            }).toThrow(TypeError(undefined + ' is not a string'))
        })

        it('should fail on numeric name', () => {
            const name = 10
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, userName, userName, email, password, password, isAdmin)
            }).toThrow(TypeError(name + ' is not a string'))
        })


        it('should fail on boolean name', () => {
            const name = true
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, userName, email, password, password, isAdmin)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on object name', () => {
            const name = {}
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, userName, email, password, password, isAdmin)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on array name', () => {
            const name = []
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, userName, email, password, password, isAdmin)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on empty name', () => {
            const name = ''
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, userName, email, password, password, isAdmin)
            }).toThrow(Error('name is empty or blank'))
        })

        it('should fail on undefined surname', () => {
            const name = 'Josepet'
            const surname = undefined
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, userName, email, password, password, isAdmin)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on numeric surname', () => {
            const name = 'Josepet'
            const surname = 10
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, userName, email, password, password, isAdmin)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on boolean surname', () => {
            const name = 'Josepet'
            const surname = false
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, userName, email, password, password, isAdmin)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on object surname', () => {
            const name = 'Josepet'
            const surname = {}
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, userName, email, password, password, isAdmin)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on array surname', () => {
            const name = 'Josepet'
            const surname = []
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, userName,email, password, password, isAdmin)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on empty surname', () => {
            const name = 'Josepet'
            const surname = ''
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const isAdmin = 'false'


            expect(() => {
                logic.registerUser(name, surname, userName,email, password, password, isAdmin)
            }).toThrow(Error('surname is empty or blank'))
        })

        it('should fail on undefined email', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = undefined
            const password = `123-${Math.random()}`
            const isAdmin = 'false'


            expect(() => {
                logic.registerUser(name, surname, userName,email, password, password, isAdmin)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on numeric email', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = 10
            const password = `123-${Math.random()}`
            const isAdmin = 'false'


            expect(() => {
                logic.registerUser(name, surname, userName,email, password, password, isAdmin)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on boolean email', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = false
            const password = `123-${Math.random()}`
            const isAdmin = 'false'


            expect(() => {
                logic.registerUser(name, surname, userName,email, password, password, isAdmin)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on object email', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = {}
            const password = `123-${Math.random()}`
            const isAdmin = 'false'


            expect(() => {
                logic.registerUser(name, surname, userName,email, password, password, isAdmin)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on array email', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = []
            const password = `123-${Math.random()}`
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, userName,email, password, password, isAdmin)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on empty email', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = ''
            const password = `123-${Math.random()}`
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, userName,email, password, password, isAdmin)
            }).toThrow(Error('email is empty or blank'))
        })

        it('should fail on undefined password', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = undefined
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, userName,email, password, password, isAdmin)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on numeric password', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = 123
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, userName,email, password, password, isAdmin)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on boolean password', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = true
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, userName,email, password, password, isAdmin)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on object password', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = {}
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, userName,email, password, password, isAdmin)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on array password', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = []
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, userName,email, password, password, isAdmin)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on empty password', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = ''
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, userName,email, password, password, isAdmin)
            }).toThrow(Error('password is empty or blank'))
        })
    })

    describe('authenticate user', () => {
        const name = 'Josepet'
        const surname = 'Pepet'
        const email = `josepet-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const userName = 'Roronoa'

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, userName, email, password: hash }))
                
        )

        it('should succeed on correct credentials', () =>
            logic.authenticateUser(email, password)
                .then(id => expect(id).toBeDefined())
        )

        it('should fail on user not found', () => {
            logic.authenticateUser('juanet@mail.com', password)
                .catch(({ message }) => expect(message).toBe('user with email juanet@mail.com not found'))
        })

        it('should fail on incorrect credentials', () => {
            logic.authenticateUser(email, 'password')
                .catch(({ message }) => expect(message).toBe('wrong credentials'))
        })

        it('should fail on undefined email', () => {
            const email = undefined

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(Error(email + ' is not a string'))
        })

        it('should fail on numeric email', () => {
            const email = 123

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(Error(email + ' is not a string'))
        })

        it('should fail on boolean email', () => {
            const email = true

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(Error(email + ' is not a string'))
        })

        it('should fail on object email', () => {
            const email = {}

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(Error(email + ' is not a string'))
        })

        it('should fail on array email', () => {
            const email = []

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(Error(email + ' is not a string'))
        })

        it('should fail on empty email', () => {
            const email = ''

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(Error('email is empty or blank'))
        })

        it('should fail on undefined password', () => {
            const password = undefined

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(Error(password + ' is not a string'))
        })

        it('should fail on numeric password', () => {
            const password = 123

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(Error(password + ' is not a string'))
        })

        it('should fail on boolean password', () => {
            const password = true

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(Error(password + ' is not a string'))
        })

        it('should fail on object password', () => {
            const password = {}

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(Error(password + ' is not a string'))
        })

        it('should fail on array password', () => {
            const password = []

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(Error(password + ' is not a string'))
        })

        it('should fail on empty password', () => {
            const password = ''

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(Error('password is empty or blank'))
        })

    })

    describe('retrieve user', () => {
        const name = 'Josepet'
        const surname = 'Pepet'
        const email = `josepet-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const isAdmin = 'false'
        const userName = 'Roronoa'

        let userId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, userName, email, password: hash, isAdmin }))
                .then(({ id }) => userId = id)
        )

        it('should succeed on correct credentials', () =>
            logic.retrieveUser(userId)
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
            return logic.retrieveUser('5c87d27a6a6e780f3f7c40f4')
                .catch(({ message }) => expect(message).toBe('id is not defined'))
        })

        it('should fail on undefined userId', () => {
            const userId = undefined

            expect(() => {
                logic.retrieveUser(userId)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on numeric userId', () => {
            const userId = 123

            expect(() => {
                logic.retrieveUser(userId)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on boolean userId', () => {
            const userId = true

            expect(() => {
                logic.retrieveUser(userId)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on object password', () => {
            const userId = {}

            expect(() => {
                logic.retrieveUser(userId)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on array password', () => {
            const userId = []

            expect(() => {
                logic.retrieveUser(userId)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on empty password', () => {
            const userId = ''

            expect(() => {
                logic.retrieveUser(userId)
            }).toThrow(Error('userId is empty or blank'))
        })
    })

    describe('update user', () => {
        const name = 'Josepet'
        const surname = 'Pepet'
        const email = `josepet-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const isAdmin = false
        const userName = 'Roronoa'

        const data = { data: [{
            name: "pepito",
            surname: "juanito"
        }]}
        let userId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, userName, email, password: hash, isAdmin }))
                .then(({ id }) => userId = id)
        )

        it('should succed on valid data', () => {

            return logic.updateUser(userId, data)
                .then(({ _id }) => User.findById(_id))
                .then(user => {
                    expect(user.name).toBe(data.data[0].name)
                    expect(user.surname).toBe(data.data[0].surname)
                    expect(user.email).toBe(email)
                    expect(user.isAdmin).toBe(isAdmin)
                })
        })
        it('should fail on undefined userId', () => {
            const userId = undefined

            expect(() => {
                logic.updateUser(userId, data)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on numeric userId', () => {
            const userId = 123

            expect(() => {
                logic.updateUser(userId, data)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on boolean userId', () => {
            const userId = true

            expect(() => {
                logic.updateUser(userId, data)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on object userId', () => {
            const userId = {}

            expect(() => {
                logic.updateUser(userId, data)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on array userId', () => {
            const userId = []

            expect(() => {
                logic.updateUser(userId, data)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on empty userId', () => {
            const userId = ''

            expect(() => {
                logic.updateUser(userId, data)
            }).toThrow(Error('userId is empty or blank'))
        })

        it('should fail on undefined data', () => {
            const data = undefined

            expect(() => {
                logic.updateUser(userId, data)
            }).toThrow(Error('data should be defined'))
        })

        it('should fail on numeric data', () => {
            const data = 123

            expect(() => {
                logic.updateUser(userId, data)
            }).toThrow(Error(data + ' is not an object'))
        })

        it('should fail on boolean data', () => {
            const data = true

            expect(() => {
                logic.updateUser(userId, data)
            }).toThrow(Error(data + ' is not an object'))
        })

        it('should fail on string data', () => {
            const data = "one"

            expect(() => {
                logic.updateUser(userId, data)
            }).toThrow(Error(data + ' is not an object'))
        })

        it('should fail on array data', () => {
            const data = []

            expect(() => {
                logic.updateUser(userId, data)
            }).toThrow(Error(data + ' is not an object'))
        })

        it('should fail on empty data', () => {
            const data = ''

            expect(() => {
                logic.updateUser(userId, data)
            }).toThrow(Error('data should be defined'))
        })
    })

    describe('create workspace', () => {

        const name = 'Josepet'
        const surname = 'Pepet'
        const email = `josepet-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const isAdmin = 'true'
        let userId = ''
        const userName = 'Roronoa'

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, userName, email, password: hash, isAdmin }))
                .then(({ id }) => userId = id)
        )

        it('should succeed on valid data', () => {

            const name = 'One Piece'

            return logic.createWorkspace(name, userId)
                .then(id => {
                    expect(id).toBeDefined()
                    expect(typeof id).toBe('string')

                    return Workspace.findById(id)
                        .then(workspace => {
                            expect(workspace._id).toBeDefined()
                            expect(workspace._id.toString()).toBe(id.toString())
                            expect(workspace.user.toString()).toBe(userId)
                        })
                })
        })

        it('should fail on user not found', () => {

            return logic.createWorkspace(name, '5c87d27a6a6e780f3f7c40f4')
                .catch(({ message }) => expect(message).toBe('user does not exist'))
        })

        it('should fail on workspace name already in use', () => {

            return logic.createWorkspace(name, userId)
                .then(id => expect(id).toBeDefined())
                .then(() => logic.createWorkspace(name, userId))
                .catch(({ message }) => expect(message).toBe(name + ' already exists'))
        })

        it('should fail on user is already in a workspace', () => {

            return logic.createWorkspace(name, userId)
                .then(() => logic.createWorkspace('potato', userId))
                .then(() => logic.createWorkspace('pepe', userId))
                .catch(({ message }) => expect(message).toBe('cannot be in more than one workspace with same email'))
        })

        it('should fail on undefined name', () => {
            const name = undefined

            expect(() => {
                logic.createWorkspace(name, userId)
            }).toThrow(Error(name + ' is not a string'))
        })

        it('should fail on numeric name', () => {
            const name = 123

            expect(() => {
                logic.createWorkspace(name, userId)
            }).toThrow(Error(name + ' is not a string'))
        })

        it('should fail on boolean name', () => {
            const name = true

            expect(() => {
                logic.createWorkspace(name, userId)
            }).toThrow(Error(name + ' is not a string'))
        })

        it('should fail on object name', () => {
            const name = {}

            expect(() => {
                logic.createWorkspace(name, userId)
            }).toThrow(Error(name + ' is not a string'))
        })

        it('should fail on array name', () => {
            const name = []

            expect(() => {
                logic.createWorkspace(name, userId)
            }).toThrow(Error(name + ' is not a string'))
        })

        it('should fail on empty name', () => {
            const name = ''

            expect(() => {
                logic.createWorkspace(name, userId)
            }).toThrow(Error('name is empty or blank'))
        })

        it('should fail on undefined userId', () => {
            const userId = undefined

            expect(() => {
                logic.createWorkspace(name, userId)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on numeric userId', () => {
            const userId = 123

            expect(() => {
                logic.createWorkspace(name, userId)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on boolean userId', () => {
            const userId = true

            expect(() => {
                logic.createWorkspace(name, userId)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on object userId', () => {
            const userId = {}

            expect(() => {
                logic.createWorkspace(name, userId)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on array userId', () => {
            const userId = []

            expect(() => {
                logic.createWorkspace(name, userId)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on empty userId', () => {
            const userId = ''

            expect(() => {
                logic.createWorkspace(name, userId)
            }).toThrow(Error('userId is empty or blank'))
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
        const userName = 'Roronoa45'


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
                    return User.create({ name: name2, surname: surname2, userName, email: email2, password: hash }).then(({ _id }) => userId2 = _id.toString())
                })
                .then(() => User.create({ name, surname, userName: 'potato', email, password: _hash }))
                .then(({ _id }) => userId = _id.toString())
                .then(() => {
                    return Workspace.create({ name: workspaceName, user: userId })
                })
                .then(({ _id }) => {
                    workspaceId = _id.toString()
                    return User.findOneAndUpdate({ id: userId, $set: { workspace: workspaceId } })
                })
        })

        it('should succed on valid data', () => {
            return logic.addUserToWorkspace(workspaceId, userId2)
                .then(() => {
                    return Workspace.findById(workspaceId)
                })
                .then(workspace => {
                    expect(workspace._id).toBeDefined()
                    expect(workspace._id.toString()).toBe(workspaceId)
                    expect(workspace.user[1].toString()).toBe(userId2)
                })
        })

        it('should fail on no existing workspaceId', () => {
            const workspaceId = '5c87d473cbedf8154470ba3a'

            return logic.addUserToWorkspace(workspaceId, userId2)
                .catch(({ message }) => expect(message).toBe('workspace does not exists'))
        })

        it('should fail on user already in another workspace', () => {

            return logic.addUserToWorkspace(workspaceId, userId2)
                .catch(({ message }) => expect(message).toBe('user is already in a workspace'))
        })

        it('should fail on undefined workspaceId', () => {
            const workspaceId = undefined

            expect(() => {
                logic.addUserToWorkspace(workspaceId, userId2)
            }).toThrow(Error(workspaceId + ' is not a string'))
        })

        it('should fail on numeric workspaceId', () => {
            const workspaceId = 123

            expect(() => {
                logic.addUserToWorkspace(workspaceId, userId2)
            }).toThrow(Error(workspaceId + ' is not a string'))
        })

        it('should fail on boolean workspaceId', () => {
            const workspaceId = true

            expect(() => {
                logic.addUserToWorkspace(workspaceId, userId2)
            }).toThrow(Error(workspaceId + ' is not a string'))
        })

        it('should fail on object workspaceId', () => {
            const workspaceId = {}

            expect(() => {
                logic.addUserToWorkspace(workspaceId, userId2)
            }).toThrow(Error(workspaceId + ' is not a string'))
        })

        it('should fail on array workspaceId', () => {
            const workspaceId = []

            expect(() => {
                logic.addUserToWorkspace(workspaceId, userId2)
            }).toThrow(Error(workspaceId + ' is not a string'))
        })

        it('should fail on empty workspaceId', () => {
            const workspaceId = ''

            expect(() => {
                logic.addUserToWorkspace(workspaceId, userId2)
            }).toThrow(Error('workId is empty or blank'))
        })

        it('should fail on undefined userId', () => {
            const userId2 = undefined

            expect(() => {
                logic.addUserToWorkspace(workspaceId, userId2)
            }).toThrow(Error(userId2 + ' is not a string'))
        })

        it('should fail on numeric userId', () => {
            const userId2 = 123

            expect(() => {
                logic.addUserToWorkspace(workspaceId, userId2)
            }).toThrow(Error(userId2 + ' is not a string'))
        })

        it('should fail on boolean userId', () => {
            const userId2 = true

            expect(() => {
                logic.addUserToWorkspace(workspaceId, userId2)
            }).toThrow(Error(userId2 + ' is not a string'))
        })

        it('should fail on object userId', () => {
            const userId2 = {}

            expect(() => {
                logic.addUserToWorkspace(workspaceId, userId2)
            }).toThrow(Error(userId2 + ' is not a string'))
        })

        it('should fail on array userId', () => {
            const userId2 = []

            expect(() => {
                logic.addUserToWorkspace(workspaceId, userId2)
            }).toThrow(Error(userId2 + ' is not a string'))
        })

        it('should fail on empty userId', () => {
            const userId2 = ''

            expect(() => {
                logic.addUserToWorkspace(workspaceId, userId2)
            }).toThrow(Error('userId is empty or blank'))
        })
    })

    describe('create link per new user', () => {

        const name = 'Josepet'
        const surname = 'Pepet'
        const email = `josepet-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const isAdmin = 'true'
        let userId = ''
        const userName = 'Roronoa'

        beforeEach(() => {
            return bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, userName, email, password: hash, isAdmin }))
                .then(({ _id }) => userId = _id.toString())
        })

        // it('should succeed on correct data', () => {

        //     return logic.createNewUserLink(userId)
        //         .then(link => {
        //             expect(link).toBeUndefined()
        //         })

        // })

        it('should fail on user does not exist', () => {
            return logic.createNewUserLink('5c87e9a9bf25412cfbdccd0e')
                .catch(({ message }) => expect(message).toBe('5c87e9a9bf25412cfbdccd0e does not exists'))
        })


        it('should fail on undefined userId', () => {
            const userId = undefined

            expect(() => {
                logic.createNewUserLink(userId)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on numeric userId', () => {
            const userId = 123

            expect(() => {
                logic.createNewUserLink(userId)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on boolean userId', () => {
            const userId = true

            expect(() => {
                logic.createNewUserLink(userId)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on object userId', () => {
            const userId = {}

            expect(() => {
                logic.createNewUserLink(userId)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on array userId', () => {
            const userId = []

            expect(() => {
                logic.createNewUserLink(userId)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on empty userId', () => {
            const userId = ''

            expect(() => {
                logic.createNewUserLink(userId)
            }).toThrow(Error('userId is empty or blank'))
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
        let userName = 'Roronoa4'
        let userName2 = 'potaot'

        let workspaceId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, userName, email, password: hash, isAdmin }))
                .then(({ id }) => userId = id)
                .then(() => Workspace.create({ name: 'One piece', userId }))
                .then(({ _id }) => workspaceId = _id.toString())
                .then(() => User.create({ name: name2, surname: surname2, userName: userName2, email: email2, password, isAdmin: isAdmin2 }))
                .then(({ id }) => userId2 = id)
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

            return logic.removeUser(userId, email2)
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

            return logic.removeUser(userId2, email)
                .catch(({ message }) => expect(message).toBe('cannot delete if not admin'))
        })

        it('should fail on undefined userId', () => {
            const userId = undefined

            expect(() => {
                logic.removeUser(userId, email)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on numeric userId', () => {
            const userId = 123

            expect(() => {
                logic.removeUser(userId, email)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on boolean userId', () => {
            const userId = true

            expect(() => {
                logic.removeUser(userId, email)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on object userId', () => {
            const userId = {}

            expect(() => {
                logic.removeUser(userId, email)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on array userId', () => {
            const userId = []

            expect(() => {
                logic.removeUser(userId, email)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on empty userId', () => {
            const userId = ''

            expect(() => {
                logic.removeUser(userId, email)
            }).toThrow(Error('userId is empty or blank'))
        })

        it('should fail on undefined email', () => {
            const email = undefined

            expect(() => {
                logic.removeUser(userId, email)
            }).toThrow(Error(email + ' is not a string'))
        })

        it('should fail on numeric email', () => {
            const email = 123

            expect(() => {
                logic.removeUser(userId, email)
            }).toThrow(Error(email + ' is not a string'))
        })

        it('should fail on boolean email', () => {
            const email = true

            expect(() => {
                logic.removeUser(userId, email)
            }).toThrow(Error(email + ' is not a string'))
        })

        it('should fail on object email', () => {
            const email = {}

            expect(() => {
                logic.removeUser(userId, email)
            }).toThrow(Error(email + ' is not a string'))
        })

        it('should fail on array email', () => {
            const email = []

            expect(() => {
                logic.removeUser(userId, email)
            }).toThrow(Error(email + ' is not a string'))
        })

        it('should fail on empty email', () => {
            const email = ''

            expect(() => {
                logic.removeUser(userId, email)
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
        const userName = 'Roronoa'

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, userName, email, password: hash, isAdmin }))
                .then(({ _id }) => userId = _id.toString())
                .then(() => Workspace.create({ name: 'onepiece', user: userId }))
                .then(workspace => {
                    workspace.hash.push(link)
                    workspaceId = workspace._id.toString()
                    return workspace.save()
                })
        )

        it('should succed on correct data', () => {

            return logic.verifyNewUserLink(userId, link)
                .then(() => Workspace.findById(workspaceId))
                .then(workspace => {
                    expect(workspace).toBeDefined()
                    expect(workspace.name).toBe('onepiece')
                    expect(workspace.hash).toBeDefined()
                    expect(workspace.hash.toString()).toBe("")
                })
        })

        it('should fail on user does not exists', () => {

            return logic.verifyNewUserLink('5c87e9a9bf25412cfbdccd0e', link)
                .catch(({ message }) => expect(message).toBe('5c87e9a9bf25412cfbdccd0e does not exists'))
        })

        it('should fail on link not found', () => {

            return logic.verifyNewUserLink(userId, '$2b$10$GqG1nrq74P6qZyBOUO2cfu5FMnK5ItYeJiV4nL2JUkvAhJKuOCBUS')
                .catch(({ message }) => expect(message).toBe('link validation failed'))
        })

        it('should fail on undefined userId', () => {
            const userId = undefined

            expect(() => {
                logic.verifyNewUserLink(userId, link)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on numeric userId', () => {
            const userId = 123

            expect(() => {
                logic.verifyNewUserLink(userId, link)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on boolean userId', () => {
            const userId = true

            expect(() => {
                logic.verifyNewUserLink(userId, link)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on object userId', () => {
            const userId = {}

            expect(() => {
                logic.verifyNewUserLink(userId, link)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on array userId', () => {
            const userId = []

            expect(() => {
                logic.verifyNewUserLink(userId, link)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on empty userId', () => {
            const userId = ''

            expect(() => {
                logic.verifyNewUserLink(userId, link)
            }).toThrow(Error('userId is empty or blank'))
        })

        it('should fail on undefined link', () => {
            const link = undefined

            expect(() => {
                logic.verifyNewUserLink(userId, link)
            }).toThrow(Error(link + ' is not a string'))
        })

        it('should fail on numeric link', () => {
            const link = 123

            expect(() => {
                logic.verifyNewUserLink(userId, link)
            }).toThrow(Error(link + ' is not a string'))
        })

        it('should fail on boolean link', () => {
            const link = true

            expect(() => {
                logic.verifyNewUserLink(userId, link)
            }).toThrow(Error(link + ' is not a string'))
        })

        it('should fail on object link', () => {
            const link = {}

            expect(() => {
                logic.verifyNewUserLink(userId, link)
            }).toThrow(Error(link + ' is not a string'))
        })

        it('should fail on array link', () => {
            const link = []

            expect(() => {
                logic.verifyNewUserLink(userId, link)
            }).toThrow(Error(link + ' is not a string'))
        })

        it('should fail on empty link', () => {
            const link = ''

            expect(() => {
                logic.verifyNewUserLink(userId, link)
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
        const userName = 'Roronoa'

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, userName, email, password: hash, isAdmin }))
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
        )

        it('should succed on correct data', () => {

            return logic.createService(userId, title, description, maxUsers, place, time)
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

            return logic.createService('5c87e9a9bf25412cfbdccd0e', title, description, maxUsers, place, time)
                .catch(({ message }) => expect(message).toBe('5c87e9a9bf25412cfbdccd0e does not exists'))
        })

        it('should fail on undefined userId', () => {
            const userId = undefined

            expect(() => {
                logic.createService(userId, title, description)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on numeric userId', () => {
            const userId = 123

            expect(() => {
                logic.createService(userId, title, description)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on boolean userId', () => {
            const userId = true

            expect(() => {
                logic.createService(userId, title, description)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on object userId', () => {
            const userId = {}

            expect(() => {
                logic.createService(userId, title, description)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on array userId', () => {
            const userId = []

            expect(() => {
                logic.createService(userId, title, description)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on empty userId', () => {
            const userId = ''

            expect(() => {
                logic.createService(userId, title, description)
            }).toThrow(Error('userId is empty or blank'))
        })

        it('should fail on undefined title', () => {
            const title = undefined

            expect(() => {
                logic.createService(userId, title, description)
            }).toThrow(Error(title + ' is not a string'))
        })

        it('should fail on numeric title', () => {
            const title = 123

            expect(() => {
                logic.createService(userId, title, description)
            }).toThrow(Error(title + ' is not a string'))
        })

        it('should fail on boolean title', () => {
            const title = true

            expect(() => {
                logic.createService(userId, title, description)
            }).toThrow(Error(title + ' is not a string'))
        })

        it('should fail on object title', () => {
            const title = {}

            expect(() => {
                logic.createService(userId, title, description)
            }).toThrow(Error(title + ' is not a string'))
        })

        it('should fail on array title', () => {
            const title = []

            expect(() => {
                logic.createService(userId, title, description)
            }).toThrow(Error(title + ' is not a string'))
        })

        it('should fail on empty title', () => {
            const title = ''

            expect(() => {
                logic.createService(userId, title, description)
            }).toThrow(Error('title is empty or blank'))
        })

        it('should fail on undefined description', () => {
            const description = undefined

            expect(() => {
                logic.createService(userId, title, description)
            }).toThrow(Error(description + ' is not a string'))
        })

        it('should fail on numeric description', () => {
            const description = 123

            expect(() => {
                logic.createService(userId, title, description)
            }).toThrow(Error(description + ' is not a string'))
        })

        it('should fail on boolean description', () => {
            const description = true

            expect(() => {
                logic.createService(userId, title, description)
            }).toThrow(Error(description + ' is not a string'))
        })

        it('should fail on object description', () => {
            const description = {}

            expect(() => {
                logic.createService(userId, title, description)
            }).toThrow(Error(description + ' is not a string'))
        })

        it('should fail on array description', () => {
            const description = []

            expect(() => {
                logic.createService(userId, title, description)
            }).toThrow(Error(description + ' is not a string'))
        })

        it('should fail on empty description', () => {
            const description = ''

            expect(() => {
                logic.createService(userId, title, description)
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
        const userName = 'Roronoa'

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, userName, email, password: hash, isAdmin }))
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
        )
        it('should succed on correct data', () => {

            return logic.retrieveService(userId, serviceId)
                .then(service => {
                    expect(service).toBeDefined()
                    expect(service.title).toBe(title)
                    expect(service.description).toBe(description)
                    expect(service.maxUsers).toBe(maxUsers)
                    expect(service.place).toBe(place)
                    expect(service.time).toBe(time)
                })
        })

        it('should fail on undefined userId', () => {
            const userId = undefined

            expect(() => {
                logic.retrieveService(userId, serviceId)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on numeric userId', () => {
            const userId = 123

            expect(() => {
                logic.retrieveService(userId, serviceId)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on boolean userId', () => {
            const userId = true

            expect(() => {
                logic.retrieveService(userId, serviceId)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on object userId', () => {
            const userId = {}

            expect(() => {
                logic.retrieveService(userId, serviceId)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on array userId', () => {
            const userId = []

            expect(() => {
                logic.retrieveService(userId, serviceId)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on empty userId', () => {
            const userId = ''

            expect(() => {
                logic.retrieveService(userId, serviceId)
            }).toThrow(Error('userId is empty or blank'))
        })

        it('should fail on undefined serviceId', () => {
            const serviceId = undefined

            expect(() => {
                logic.retrieveService(userId, serviceId)
            }).toThrow(Error(serviceId + ' is not a string'))
        })

        it('should fail on numeric serviceId', () => {
            const serviceId = 123

            expect(() => {
                logic.retrieveService(userId, serviceId)
            }).toThrow(Error(serviceId + ' is not a string'))
        })

        it('should fail on boolean serviceId', () => {
            const serviceId = true

            expect(() => {
                logic.retrieveService(userId, serviceId)
            }).toThrow(Error(serviceId + ' is not a string'))
        })

        it('should fail on object serviceId', () => {
            const serviceId = {}

            expect(() => {
                logic.retrieveService(userId, serviceId)
            }).toThrow(Error(serviceId + ' is not a string'))
        })

        it('should fail on array serviceId', () => {
            const serviceId = []

            expect(() => {
                logic.retrieveService(userId, serviceId)
            }).toThrow(Error(serviceId + ' is not a string'))
        })

        it('should fail on empty serviceId', () => {
            const serviceId = ''

            expect(() => {
                logic.retrieveService(userId, serviceId)
            }).toThrow(Error('serviceId is empty or blank'))
        })
    })

    describe('update service', () => {

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
        let time = 30
        let maxUsers = 4
        let place = 'here'
        const data = {
            title: 'pepito',
            description: 'juanito',
            maxUsers: 5,
            place: 'here',
            time: 40
        }
        const userName = 'Roronoa'

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, userName, email, password: hash, isAdmin }))
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
        )

        it('should succed on correct data', () => {

            return logic.updateService(userId, serviceId, data)
                .then(({ id }) => Service.findById(id))
                .then(service => {
                    expect(service).toBeDefined()
                    expect(service.title).toBe(data.title)
                    expect(service.description).toBe(data.description)
                    expect(service.maxUsers).toBe(data.maxUsers)
                    expect(service.place).toBe(data.place)
                    expect(service.time).toBe(data.time)
                })
        })

        it('should fail on user trying to update another person service', () => {

            return logic.updateService('5c87e9a9bf25412cfbdccd0e', serviceId, data)
                .catch(({ message }) => expect(message).toBe('this user cannot update this service'))
        })

        it('should fail on undefined userId', () => {
            const userId = undefined

            expect(() => {
                logic.updateService(userId, serviceId, data)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on numeric userId', () => {
            const userId = 123

            expect(() => {
                logic.updateService(userId, serviceId, data)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on boolean userId', () => {
            const userId = true

            expect(() => {
                logic.updateService(userId, serviceId, data)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on object userId', () => {
            const userId = {}

            expect(() => {
                logic.updateService(userId, serviceId, data)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on array userId', () => {
            const userId = []

            expect(() => {
                logic.updateService(userId, serviceId, data)
            }).toThrow(Error(userId + ' is not a string'))
        })

        it('should fail on empty userId', () => {
            const userId = ''

            expect(() => {
                logic.updateService(userId, serviceId, data)
            }).toThrow(Error('userId is empty or blank'))
        })

        it('should fail on undefined serviceId', () => {
            const serviceId = undefined

            expect(() => {
                logic.updateService(userId, serviceId, data)
            }).toThrow(Error(serviceId + ' is not a string'))
        })

        it('should fail on numeric serviceId', () => {
            const serviceId = 123

            expect(() => {
                logic.updateService(userId, serviceId, data)
            }).toThrow(Error(serviceId + ' is not a string'))
        })

        it('should fail on boolean serviceId', () => {
            const serviceId = true

            expect(() => {
                logic.updateService(userId, serviceId, data)
            }).toThrow(Error(serviceId + ' is not a string'))
        })

        it('should fail on object serviceId', () => {
            const serviceId = {}

            expect(() => {
                logic.updateService(userId, serviceId, data)
            }).toThrow(Error(serviceId + ' is not a string'))
        })

        it('should fail on array serviceId', () => {
            const serviceId = []

            expect(() => {
                logic.updateService(userId, serviceId, data)
            }).toThrow(Error(serviceId + ' is not a string'))
        })

        it('should fail on empty serviceId', () => {
            const serviceId = ''

            expect(() => {
                logic.updateService(userId, serviceId, data)
            }).toThrow(Error('serviceId is empty or blank'))
        })



        it('should fail on undefined data', () => {
            const data = undefined

            expect(() => {
                logic.updateService(userId, serviceId, data)
            }).toThrow(Error('data should be defined'))
        })

        it('should fail on numeric data', () => {
            const data = 123

            expect(() => {
                logic.updateService(userId, serviceId, data)
            }).toThrow(Error(data + ' is not an object'))
        })

        it('should fail on boolean data', () => {
            const data = true

            expect(() => {
                logic.updateService(userId, serviceId, data)
            }).toThrow(Error(data + ' is not an object'))
        })

        it('should fail on string data', () => {
            const data = 'sdsds'

            expect(() => {
                logic.updateService(userId, serviceId, data)
            }).toThrow(Error(data + ' is not an object'))
        })

        it('should fail on array data', () => {
            const data = []

            expect(() => {
                logic.updateService(userId, serviceId, data)
            }).toThrow(Error(data + ' is not an object'))
        })

        it('should fail on empty data', () => {
            const data = ''

            expect(() => {
                logic.updateService(userId, serviceId, data)
            }).toThrow(Error('data should be defined'))
        })
    })

    describe('remove service', () => {

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
        let time = 60
        const userName = 'Roronoa'

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, userName, email, password: hash, isAdmin }))
                .then(({ _id }) => {
                    userId = _id.toString()
                    return Workspace.create({ name: 'Onepiece', user: _id })
                })
                .then(workspace => {
                    workspaceId = workspace._id.toString()
                    workspace.user = userId

                    return workspace.save()
                })
                .then(() => User.findOneAndUpdate({ _id: userId, $set: { workspace: workspaceId } }))
                .then(() => Service.create({ title, description, maxUsers, place, time, user: userId }))
                .then(({ _id }) => serviceId = _id.toString())
        )

        it('should succed on correct data', () => {

            return logic.deleteService(userId, serviceId)
                .then(() => Service.findById(serviceId))
                .then((service) => {
                    expect(service).toBe(null)
                })
        })

        it('should fail on user trying to delete someone else service', () => {

            return logic.deleteService('5c87e9a9bf25412cfbdccd0e', serviceId)
                .catch(({ message }) => expect(message).toBe('this user cannot delete this service'))
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
        const userName = 'Roronoa'

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, userName, email, password: hash, isAdmin }))
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
        )


        it('should succed on correct data', () => {

            return logic.retrieveUserServices(userId)
                .then(_services => {
                    expect(_services).toBeDefined()
                    expect(_services).toEqual([])
                })
        })

        it('should fail on user not exists', () => {

            return logic.retrieveUserServices('5c87e9a9bf25412cfbdccd0e')
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
        const userName = 'Roronoapp'
        const userName2 = 'Roronoa'

        beforeEach(() => {

            return logic.registerUser(name, surname, userName, email, password, password)
                .then(id => {
                    userId = id.toString()
                    return logic.createWorkspace('One piece', userId)
                })
                .then(id => {
                    workspaceId = id.toString()
                    return Service.create({ user: userId, title, description, maxUsers, place, time })
                })
                .then(service => serviceId = service._id.toString())
                .then(() => logic.registerUser(name, surname, userName2, 'joanet@mail.com', password, password))
                .then(id => {
                    userId2 = id.toString()
                    return logic.addUserToWorkspace(workspaceId, userId2)
                        .then(() => logic.addUserToService(userId2, serviceId))
                })
        })

        it('should succed on valid data', () => {
            return logic.retrieveUserSubmitedEvents(userId2)
                .then(_services => {
                    debugger
                    expect(_services).toBeDefined()
                    expect(_services).toEqual([])
                })
        })

        it('should fail on non existing user', () => {
            return logic.retrieveUserSubmitedEvents('5c83d50fd800e035752e32a7')
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
        let time2 = -200
        const userName = 'Roronoa'
        const userName2 = 'Roronoa34'
        const userName3 = 'Roronoa54'
        const userName4 = 'Roronoa23'

        beforeEach(() => {
            return logic.registerUser(name, surname, userName, email, password, password)
                .then(id => {
                    userId = id.toString()
                    return logic.createWorkspace('One piece', userId)
                })
                .then(id => {
                    workspaceId = id.toString()
                    return Service.create({ user: userId, title, description, maxUsers, place, time, submitedUsers: [] })
                })
                .then(service => serviceId = service._id.toString())
                .then(() => logic.registerUser(name, surname, userName2, 'joanet@mail.com', password, password))
                .then(id => {
                    userId2 = id.toString()
                    return logic.addUserToWorkspace(workspaceId, userId2)
                })
                .then(() => User.create({ name, surname, userName: userName3, email: 'joanetaaa@mail.com', password, password, time: time2 }))
                .then(({ _id }) => {
                    userId3 = _id.toString()
                    return logic.addUserToWorkspace(workspaceId, userId3)
                })
                .then(() => User.create({ name, surname, userName: userName4, email: 'joanetaaaooo@mail.com', password, password, time }))
                .then(({ _id }) => {
                    userId4 = _id.toString()
                    return logic.addUserToWorkspace(workspaceId, userId4)
                })
        })

        it('should succed on valid data', () => {

            return logic.addUserToService(userId2, serviceId)
                .then(service => {
                    expect(service).toBeDefined()
                    expect(service._id.toString()).toBe(serviceId)
                    expect(service.place).toBe(place)
                    expect(service.maxUsers).toBe(maxUsers)
                    expect(service.time).toBe(time)
                    expect(service.title).toBe(title)
                    expect(service.description).toBe(description)
                })
        })

        it('should fail on user time has exceeded limit', () => {

            return logic.addUserToService(userId3, serviceId)
                .catch(({ message }) => expect(message).toBe('you cannot ask for more services, please create a service to gain more time'))
        })

        it('should fail on max submited users achieved', () => {

            return logic.addUserToService(userId2, serviceId)
                .then(() => logic.addUserToService(userId4, serviceId))
                .then(() => logic.addUserToService(userId4, serviceId))
                .catch(({ message }) => expect(message).toBe('max submited users achieved, you cannot submit to this event'))
        })

        it('should fail on user is aldready submited to this event', () => {

            return logic.addUserToService(userId2, serviceId)
                .then(() => logic.addUserToService(userId2, serviceId))
                .catch(({ message }) => expect(message).toBe('user is already submited to this service'))
        })

        it('should fail on user cannot submit to his own service', () => {

            return logic.addUserToService(userId, serviceId)
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
        const userName = 'Roronoa'

        beforeEach(() => {
            return logic.registerUser(name, surname, userName, email, password, password)
                .then(id => {
                    userId = id.toString()
                    return logic.createWorkspace('One piece', userId)
                })
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

            return logic.retrieveWorkspaceServices(userId, workspaceId)
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

            return logic.retrieveWorkspaceServices(userId, '5c83d50fd800e035752e32a7')
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
        const userName = 'Roronoa'

        beforeEach(() => {
            return logic.registerUser(name, surname, userName, email, password, password)
                .then(id => {
                    userId = id.toString()
                    return logic.createWorkspace('One piece', userId)
                })
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

            return logic.closeService(serviceId)
                .then(service => {
                    expect(service).toBeDefined()
                })
                .then(()=> logic.retrieveService(userId, serviceId))
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

            return logic.closeService('5c83d50fd800e035752e32a7')
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
        const userName = 'Roronoa'

        beforeEach(() => {
            return logic.registerUser(name, surname, userName, email, password, password)
                .then(id => {
                    userId = id.toString()
                    return logic.createWorkspace('One piece', userId)
                })
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

            return logic.createComment(userId, serviceId, text)
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
        const userName = 'Roronoa'

        beforeEach(() => {
            return logic.registerUser(name, surname, userName, email, password, password)
                .then(id => {
                    userId = id.toString()
                    return logic.createWorkspace('One piece', userId)
                })
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
                .then(() => logic.createComment(userId, serviceId, text))
                .then(id => commentId = id.toString())
        })

        it('should succed on valid data', () => {

            return logic.retrieveServiceComments(serviceId)
                .then( comments => {
                    expect(comments).toBeDefined()
                    expect(comments[0].user.toString()).toBe(userId)
                    expect(comments[0].text).toBe(text)
                    expect(comments[0].id.toString()).toBe(commentId)
                })
        })

        it('should fail on service not found', () => {
            
            return logic.retrieveServiceComments('5c83d50fd800e035752e32a7')
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
        const userName = 'Roronoa'

        beforeEach(() => {
            return logic.registerUser(name, surname, userName, email, password, password)
                .then(id => {
                    userId = id.toString()
                    return logic.createWorkspace('One piece', userId)
                })
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
                .then(() => logic.createComment(userId, serviceId, text))
                .then(id => commentId = id.toString())
        })

        it('should succed on valid data', () => {

            return logic.removeComment(serviceId, commentId)
                .then(() => logic.retrieveServiceComments(serviceId))
                .then(service => {
                    expect(service).toBeDefined()
                    expect(service).toEqual([])})
        })

        it('should fail on service not found', () => {

            return logic.removeComment('5c83d50fd800e035752e32a7', commentId)
                .catch(({message}) => expect(message).toBe('service not found'))
        })

        it('should fail on service has no comments to remove', () => {

            return logic.removeComment(serviceId, commentId)
                .then(() => logic.removeComment(serviceId, commentId))
                .catch(({message}) => expect(message).toBe('comment not found'))
        })
    })

    describe('search services', () => {
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
        const userName = 'Roronoa'
        let query = 'english'

        beforeEach(() => {
            return logic.registerUser(name, surname, userName, email, password, password)
                .then(id => {
                    userId = id.toString()
                    return logic.createWorkspace('One piece', userId)
                })
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

            return logic.searchServices(userId, query)
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

            return logic.searchServices(userId, 'potato')
                .catch(({ message }) => expect(message).toBe('workspace not found'))
        })
    })

    describe('retrieve user Profile', () => {
        const name = 'Josepet'
        const surname = 'Pepet'
        const email = `josepet-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const isAdmin = 'false'
        const userName = 'Roronoa'

        let userId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, userName, email, password: hash, isAdmin }))
                .then(({ id }) => userId = id)
        )

        it('should succeed on correct credentials', () =>
            logic.retrieveUserProfile(userId, userName)
                .then(user => {
                    expect(user.id).toBe(userId)
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.email).toBe(email)
                    expect(user.userName).toBe(userName)

                    expect(user.save).toBeUndefined()
                    expect(user.password).toBeUndefined()
                    expect(user.__v).toBeUndefined()
                })
        )

        it('should fail on user not found', () => {
            return logic.retrieveUserProfile('5c87d27a6a6e780f3f7c40f4', userName)
                .catch(({ message }) => expect(message).toBe('id is not defined'))
        })
    })
})