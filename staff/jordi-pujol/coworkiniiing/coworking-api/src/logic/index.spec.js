'use strict'

require('dotenv').config()

require('isomorphic-fetch')

const { User, Workspace } = require('../models')
const mongoose = require('mongoose')
const expect = require('expect')
const logic = require('.')
const bcrypt = require('bcrypt')

const { env: { TEST_DB_URL } } = process

describe('logic', () => {
    before(() => mongoose.connect(TEST_DB_URL, { useNewUrlParser: true }))

    beforeEach(() =>
        Promise.all([
            Workspace.deleteMany(),
            User.deleteMany()
        ])
    )

    describe('register user', () => {
        const name = 'Josepet'
        const surname = 'Pepet'
        const email = `josepet-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const passwordConfirm = password
        const isAdmin = 'false'

        it('should succeed on valid data', async () => {
            const id = await logic.registerUser(name, surname, email, password, passwordConfirm, isAdmin)

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

        it('should fail on undefined name', () => {
            const name = undefined
            // const surname = 'Pepet'
            // const email = 'josepet@mail.com'
            // const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(undefined + ' is not a string'))
        })

        it('should fail on numeric name', () => {
            const name = 10
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(name + ' is not a string'))
        })


        it('should fail on boolean name', () => {
            const name = true
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const isAdmin = 'false'

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
            }).toThrow(Error('name cannot be empty'))
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
            }).toThrow(Error('surname cannot be empty'))
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
            }).toThrow(Error('email cannot be empty'))
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
            }).toThrow(Error('password cannot be empty'))
        })

        it('should fail on undefined isAdmin', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const isAdmin = undefined

            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(isAdmin + ' is not a string'))
        })

        it('should fail on numeric isAdmin', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const isAdmin = 123

            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(isAdmin + ' is not a string'))
        })

        it('should fail on boolean isAdmin', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const isAdmin = true

            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(isAdmin + ' is not a string'))
        })

        it('should fail on object isAdmin', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const isAdmin = {}

            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(isAdmin + ' is not a string'))
        })

        it('should fail on array isAdmin', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const isAdmin = []

            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(isAdmin + ' is not a string'))
        })

        it('should fail on empty isAdmin', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const isAdmin = ''

            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(Error('isAdmin cannot be empty'))
        })
    })

    describe('authenticate user', () => {
        const name = 'Josepet'
        const surname = 'Pepet'
        const email = `josepet-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const isAdmin = 'false'

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash, isAdmin }))
        )

        it('should succeed on correct credentials', () =>
            logic.authenticateUser(email, password)
                .then(id => expect(id).toBeDefined())
        )

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
            }).toThrow(Error('email cannot be empty'))
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
            }).toThrow(Error('password cannot be empty'))
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
            }).toThrow(Error('userId cannot be empty'))
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

            logic.createWorkspace(name, userId)
                .then(id => {
                    expect(id).toBeDefined()
                    expect(typeof id).toBe('string')

                    return Workspace.findById(id)
                        .then(workspace => {
                            expect(workspace._id).toBeDefined()
                            expect(workspace._id.toString()).toBe(id)
                            expect(workspace.user).toContain(userId)
                        })
                })
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
            }).toThrow(Error('name cannot be empty'))
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
            }).toThrow(Error('userId cannot be empty'))
        })
    })

    describe('add user to workspace', () => {

        const name = 'Josepet'
        const surname = 'Pepet'
        const email = `josepet-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const isAdmin = 'true'
        let userId = ''
        let workspaceName = `One Piece-${Math.random()}`
        let workspaceId = ''

        const name2 = 'Josepet'
        const surname2 = 'Pepet'
        const email2 = `josepet-${Math.random()}@mail.com`
        const password2 = `123-${Math.random()}`
        const isAdmin2 = 'true'
        let userId2 = ''

        beforeEach(() =>{
            bcrypt.hash(password, 10)
                .then(hash => {
                    User.create({ name: name2, surname: surname2, email: email2, password: hash, isAdmin: isAdmin2 }).then(({ id }) => userId2 = id)
                    return hash
                })
                .then((hash) => User.create({ name, surname, email, password: hash, isAdmin }))
                .then(({ id }) => userId = id)
                .then(() => {
                    return Workspace.create({ name: workspaceName, user: userId })
                })
                .then(({ _id }) => {
                    workspaceId = _id.toString()
                    return User.findOneAndUpdate({ id: userId, $set: { workspace: workspaceId } })
                })

            // bcrypt.hash(password2, 10)
            //     .then((hash) => User.create({ name: name2, surname: surname2, email: email2, password: hash, isAdmin: isAdmin2 }))
            //     .then(({ id }) => userId2 = id)
            })

        it('should succed on valid data', () => {
            logic.addUserToWorkspace(workspaceId, userId2)
                .then(() => {
                    return Workspace.findById(workspaceId)
                })
                .then(workspace => {
                    expect(workspace._id).toBeDefined()
                    console.log('dsaadsdasd')
                    // expect(workspace._id.toString()).toBe(id)
                    // expect(workspace.user).toContain(userId2)
                })
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
            }).toThrow(Error('workspaceId cannot be empty'))
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
            }).toThrow(Error('userId cannot be empty'))
        })
    })
})