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

    beforeEach(() =>
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
            const id = await logic.registerUser(name, surname, email, password, passwordConfirm)

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
                logic.registerUser(name, surname, email, password, passwordConfirm)
            }).toThrow(TypeError('passwords do not match'))

        })

        it('should fail on already existing user', () => {
            const name = 'juan'
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`

            return logic.registerUser(name, surname, email, password, password)
                .then(() => logic.registerUser(name, surname, email, password, password))
                .catch(({ message }) => {
                    expect(message).toBe(`user with email ${email} already exists`)
                }
                )
        })

        it('should fail on undefined name', () => {
            const name = undefined

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(undefined + ' is not a string'))
        })

        it('should fail on numeric name', () => {
            const name = 10
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(name + ' is not a string'))
        })


        it('should fail on boolean name', () => {
            const name = true
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on object name', () => {
            const name = {}
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on array name', () => {
            const name = []
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on empty name', () => {
            const name = ''
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(Error('name is empty or blank'))
        })

        it('should fail on undefined surname', () => {
            const name = 'Josepet'
            const surname = undefined
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on numeric surname', () => {
            const name = 'Josepet'
            const surname = 10
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on boolean surname', () => {
            const name = 'Josepet'
            const surname = false
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on object surname', () => {
            const name = 'Josepet'
            const surname = {}
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on array surname', () => {
            const name = 'Josepet'
            const surname = []
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on empty surname', () => {
            const name = 'Josepet'
            const surname = ''
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const isAdmin = 'false'


            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(Error('surname is empty or blank'))
        })

        it('should fail on undefined email', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = undefined
            const password = `123-${Math.random()}`
            const isAdmin = 'false'


            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on numeric email', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = 10
            const password = `123-${Math.random()}`
            const isAdmin = 'false'


            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on boolean email', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = false
            const password = `123-${Math.random()}`
            const isAdmin = 'false'


            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on object email', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = {}
            const password = `123-${Math.random()}`
            const isAdmin = 'false'


            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on array email', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = []
            const password = `123-${Math.random()}`
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on empty email', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = ''
            const password = `123-${Math.random()}`
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(Error('email is empty or blank'))
        })

        it('should fail on undefined password', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = undefined
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on numeric password', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = 123
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on boolean password', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = true
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on object password', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = {}
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on array password', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = []
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on empty password', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = ''
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(Error('password is empty or blank'))
        })
    })

    describe('authenticate user', () => {
        const name = 'Josepet'
        const surname = 'Pepet'
        const email = `josepet-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
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

        let userId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash, isAdmin }))
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

        const data = {
            name: "pepito",
            surname: "juanito"
        }
        let userId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash, isAdmin }))
                .then(({ id }) => userId = id)
        )

        it('should succed on valid data', () => {

            return logic.updateUser(userId, data)
                .then(({ _id }) => User.findById(_id))
                .then(user => {
                    expect(user.name).toBe(data.name)
                    expect(user.surname).toBe(data.surname)
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

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash, isAdmin }))
                .then(({ id }) => userId = id)
        )

        it('should succeed on valid data', () => {

            const name = 'One Piece'

            return logic.createWorkspace(name, userId)
                .then(id => {
                    expect(id).toBeDefined()
                    expect(typeof id).toBe('object')

                    return Workspace.findById(id)
                        .then(workspace => {
                            expect(workspace._id).toBeDefined()
                            expect(workspace._id.toString()).toBe(id.toString())
                            expect(workspace.user).toContain(userId)
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
        })

        it('should succed on valid data', () => {
            return logic.addUserToWorkspace(workspaceId, userId2)
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

        beforeEach(() => {
            return bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash, isAdmin }))
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

        let workspaceId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash, isAdmin }))
                .then(({ id }) => userId = id)
                .then(() => Workspace.create({ name: 'One piece', userId }))
                .then(({ _id }) => workspaceId = _id.toString())
                .then(() => User.create({ name: name2, surname: surname2, email: email2, password, isAdmin: isAdmin2 }))
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

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash, isAdmin }))
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

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash, isAdmin }))
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

    describe('retrieve user services', ()=> {

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
        )


        it('should succed on correct data', () => {

            return logic.retrieveUserServices(userId)
                .then(_services => {
                    expect(_services).toBeDefined()
                    expect(_services).toEqual([])
                })
        })

        it ('should fail on user not exists', ()=> {

            return logic.retrieveUserServices('5c87e9a9bf25412cfbdccd0e')
                .catch(({message}) => expect(message).toBe('user does not exists'))
        })
    })
})