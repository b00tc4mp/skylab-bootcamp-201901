const userData = require('.')
const fs = require('fs').promises
const path = require('path')
require('../../common/utils/array-random.polyfill')

userData.__file__ = path.join(__dirname, 'users.test.json')

describe('user data', () => {
    const names = ['Pepito', 'Fulanito', 'Menganito']

    const users = new Array(Math.random(100)).fill().map(() => ({
        id: `123-${Math.random()}`,
        name: `${names.random()}-${Math.random()}`,
        surname: `Grillo-${Math.random()}`,
        email: `grillo-${Math.random()}@mail.com`,
        password: `123-${Math.random()}`
    }))

    beforeEach(() => delete userData.__users__)

    describe('create', () => {
        beforeEach(() => fs.writeFile(userData.__file__, '[]'))

        it('should succeed on correct data', () => {
            const user = {
                name: 'Manuel',
                surname: 'Barzi',
                email: 'manuelbarzi@gmail.com',
                password: '123'
            }

            return userData.create(user)
                .then(() => {
                    expect(typeof user.id).toBe('string')

                    return fs.readFile(userData.__file__, 'utf8')
                })
                .then(content => {
                    expect(content).toBeDefined()

                    const users = JSON.parse(content)

                    expect(users).toHaveLength(1)

                    const [_user] = users

                    // expect(_user).toMatchObject(user) 
                    expect(_user).toEqual(user)
                })
        })
    })

    describe('list', () => {
        beforeEach(() => fs.writeFile(userData.__file__, JSON.stringify(users)))

        it('should succeed and return items if users exist', () => {
            userData.list()
                .then(_users => {
                    expect(_users).toHaveLength(users.length)

                    // expect(_users).toMatchObject(users)
                    expect(_users).toEqual(users)
                })
        })
    })

    describe('retrieve', () => {
        beforeEach(() => fs.writeFile(userData.__file__, JSON.stringify(users)))

        it('should succeed on an already existing user', () => {
            const user = users[Math.random(users.length - 1)]

            return userData.retrieve(user.id)
                .then(_user =>
                    expect(_user).toEqual(user)
                )
        })
    })

    describe('update', () => {
        beforeEach(() => fs.writeFile(userData.__file__, JSON.stringify(users)))

        describe('replacing', () => {
            it('should succeed on correct data', () => {
                const user = users[Math.random(users.length - 1)]

                const data = { name: 'n', email: 'e', password: 'p', lastAccess: Date.now() }

                return userData.update(user.id, data, true)
                    .then(() => fs.readFile(userData.__file__, 'utf8'))
                    .then(JSON.parse)
                    .then(users => {
                        const _user = users.find(({ id }) => id === user.id)

                        expect(_user).toBeDefined()

                        expect(_user.id).toEqual(user.id)

                        expect(_user).toMatchObject(data)

                        expect(Object.keys(_user).length).toEqual(Object.keys(data).length + 1)
                    })
            })
        })

        describe('not replacing', () => {
            it('should succeed on correct data', () => {
                const user = users[Math.random(users.length - 1)]

                const data = { name: 'n', surname: 's', email: 'e', password: 'p', lastAccess: Date.now() }

                return userData.update(user.id, data)
                    .then(() => fs.readFile(userData.__file__, 'utf8'))
                    .then(JSON.parse)
                    .then(users => {
                        const _user = users.find(({ id }) => id === user.id)

                        expect(_user).toBeDefined()

                        expect(_user.id).toEqual(user.id)

                        expect(_user).toMatchObject(data)

                        expect(Object.keys(_user).length).toEqual(Object.keys(data).length + 1)
                    })
            })
        })
    })

    describe('delete', () => {
        // TODO
    })

    describe('find', () => {
        let _users

        beforeEach(() => {
            _users = users.concat({
                id: `123-${Math.random()}`,
                name: `Fulanito-${Math.random()}`,
                surname: `Grillo-${Math.random()}`,
                email: `pepitogrillo-${Math.random()}@mail.com`,
                password: `123-${Math.random()}`
            })

            return fs.writeFile(userData.__file__, JSON.stringify(_users))
        })

        it('should succeed on matching existing users', () => {
            const criteria = ({ name, email }) => (name.includes('F') || name.includes('a')) && email.includes('i')

            return userData.find(criteria)
                .then(() => userData.find(criteria))
                .then(users => {
                    const __users = _users.filter(criteria)

                    expect(users).toEqual(__users)
                })
        })
    })

    afterAll(() => fs.writeFile(userData.__file__, '[]'))
})