const userData = require('.')
require('../../common/utils/array-random.polyfill')
const { MongoClient, ObjectId } = require('mongodb')

const url = 'mongodb://localhost/rest-api-test'

describe('user data', () => {
    let client, users

    beforeAll(async () => {
        client = await MongoClient.connect(url, { useNewUrlParser: true })

        const db = client.db()

        users = db.collection('users')

        userData.__col__ = users
    })

    const names = ['Pepito', 'Fulanito', 'Menganito']

    const _users = new Array(Math.random(100)).fill().map(() => ({
        name: `${names.random()}-${Math.random()}`,
        surname: `Grillo-${Math.random()}`,
        email: `grillo-${Math.random()}@mail.com`,
        password: `123-${Math.random()}`
    }))

    beforeEach(() => users.deleteMany())

    describe('create', () => {
        fit('should succeed on correct data', async () => {
            const user = {
                name: 'Manuel',
                surname: 'Barzi',
                email: 'manuelbarzi@gmail.com',
                password: '123'
            }

            await userData.create(user)
            
            expect(user._id).toBeInstanceOf(ObjectId)
            
            const cursor = await users.find()
            
            const _users = []
            
            await cursor.forEach(user => _users.push(user))
            
            expect(_users).toHaveLength(1)

            const [_user] = _users

            expect(_user).toEqual(user)
        })
    })

    describe('list', () => {
        beforeEach(() => file.writeFile(userData.__file__, JSON.stringify(users)))

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
        beforeEach(() => file.writeFile(userData.__file__, JSON.stringify(users)))

        it('should succeed on an already existing user', () => {
            const user = users[Math.random(users.length - 1)]

            return userData.retrieve(user.id)
                .then(_user =>
                    expect(_user).toEqual(user)
                )
        })
    })

    describe('update', () => {
        beforeEach(() => file.writeFile(userData.__file__, JSON.stringify(users)))

        describe('replacing', () => {
            it('should succeed on correct data', () => {
                const user = users[Math.random(users.length - 1)]

                const data = { name: 'n', email: 'e', password: 'p', lastAccess: Date.now() }

                return userData.update(user.id, data, true)
                    .then(() => file.readFile(userData.__file__, 'utf8'))
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
                    .then(() => file.readFile(userData.__file__, 'utf8'))
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

            return file.writeFile(userData.__file__, JSON.stringify(_users))
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

    afterAll(() => client.close())
})