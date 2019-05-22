const userData = require('.')
require('../../common/utils/array-random.polyfill')
const { MongoClient, ObjectId } = require('mongodb')

const url = 'mongodb://localhost/rest-api-user-data-test'

describe('user data', () => {
    let client, users

    beforeAll(async () => {
        client = await MongoClient.connect(url, { useNewUrlParser: true })

        const db = client.db()

        users = db.collection('users')

        userData.__col__ = users
    })

    const names = ['Pepito', 'Fulanito', 'Menganito']

    let _users

    beforeEach(async () => {
        await users.deleteMany()

        _users = new Array(Math.random(50, 100)).fill().map(() => ({
            name: `${names.random()}-${Math.random()}`,
            surname: `Grillo-${Math.random()}`,
            email: `grillo-${Math.random()}@mail.com`,
            password: `123-${Math.random()}`
        }))
    })

    describe('create', () => {
        it('should succeed on correct data', async () => {
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
        beforeEach(() => users.insert(_users))

        it('should succeed and return items if users exist', async () => {
            const users = await userData.list()

            expect(users).toHaveLength(_users.length)

            expect(users).toEqual(_users)
        })
    })

    describe('retrieve', () => {
        beforeEach(() => users.insert(_users))

        it('should succeed on an already existing user', async () => {
            const user = _users.random()

            const _user = await userData.retrieve(user._id)

            expect(_user).toEqual(user)
        })
    })

    describe('update', () => {
        beforeEach(() => users.insert(_users))

        describe('replacing', () => {
            it('should succeed on correct data', async () => {
                const user = _users.random()

                const data = { email: 'e@mail.com', lastAccess: Date.now() }

                await userData.update(user._id, data, true)

                const _user = await users.findOne(user._id)

                expect(_user).toBeDefined()

                expect(_user._id).toEqual(user._id)

                expect(_user).toMatchObject(data)

                expect(Object.keys(_user).length).toEqual(Object.keys(data).length + 1)
            })
        })

        describe('not replacing', () => {
            it('should succeed on correct data', async () => {
                const user = _users.random()

                const data = { name: 'n', lastAccess: Date.now() }

                await userData.update(user._id, data)

                const _user = await users.findOne(user._id)

                expect(_user).toBeDefined()

                expect(_user._id).toEqual(user._id)

                expect(_user).toMatchObject(data)

                expect(Object.keys(_user).length).toEqual(Object.keys(user).length + 1)
            })
        })
    })

    describe('delete', () => {
        // TODO
    })

    describe('find', () => {
        let __users

        beforeEach(() => {
            __users = _users.concat({
                id: `123-${Math.random()}`,
                name: `Fulanito-${Math.random()}`,
                surname: `Grillo-${Math.random()}`,
                email: `grillo-${Math.random()}@mail.com`,
                password: `123-${Math.random()}`
            })

            return users.insert(__users)
        })

        it('should succeed on matching existing users', async () => {
            const criteria = ({ name, email }) => (name.includes('F') || name.includes('a')) && email.includes('i')

            const users = await userData.find(criteria)

            debugger

            expect(users.length).toBeGreaterThan(0)

            const _users = __users.filter(criteria)

            expect(users).toEqual(_users)

            users.forEach(({name}) => expect(name.startsWith('Pepito')).toBeFalsy())
        })
    })

    afterAll(() => client.close())
})