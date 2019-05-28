const userData = require('.')
const file = require('../../common/utils/file')
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
        beforeEach(() => file.writeFile(userData.__file__, '[]'))

        it('should succeed on correct data', async () => {
            const user = {
                name: 'Manuel',
                surname: 'Barzi',
                email: 'manuelbarzi@gmail.com',
                password: '123'
            }

            await userData.create(user)
            expect(typeof user.id).toBe('string')

            const content = await file.readFile(userData.__file__, 'utf8')
           
            expect(content).toBeDefined()

            const users = JSON.parse(content)

            expect(users).toHaveLength(1)

            const [_user] = users

            // expect(_user).toMatchObject(user) 
            expect(_user).toEqual(user)
                
        })
    })

    describe('list', () => {
        beforeEach(() => file.writeFile(userData.__file__, JSON.stringify(users)))

        it('should succeed and return items if users exist', async () => {
            const _users = await userData.list()
            expect(_users).toHaveLength(users.length)

            // expect(_users).toMatchObject(users)
            expect(_users).toEqual(users)
        })
    })

    describe('retrieve', () => {
        beforeEach(() => file.writeFile(userData.__file__, JSON.stringify(users)))

        it('should succeed on an already existing user', async () => {
            const user = users[Math.random(users.length - 1)]

            const _user = await userData.retrieve(user.id)

            expect(_user).toEqual(user)
        })
    })

    describe('update', () => {
        beforeEach(() => file.writeFile(userData.__file__, JSON.stringify(users)))

        describe('replacing', () => {
            it('should succeed on correct data', async () => {
                const user = users[Math.random(users.length - 1)]

                const data = { name: 'n', email: 'e', password: 'p', lastAccess: Date.now() }

                await userData.update(user.id, data, true)
            
                const _users = JSON.parse(await file.readFile(userData.__file__, 'utf8'))
                
                const _user = _users.find(({ id }) => id === user.id)

                expect(_user).toBeDefined()

                expect(_user.id).toEqual(user.id)

                expect(_user).toMatchObject(data)

                expect(Object.keys(_user).length).toEqual(Object.keys(data).length + 1)
                    
            })
        })

        describe('not replacing', () => {
            it('should succeed on correct data', async () => {
                const user = users[Math.random(users.length - 1)]

                const data = { name: 'n', surname: 's', email: 'e', password: 'p', lastAccess: Date.now() }

                await userData.update(user.id, data)

                const _users = JSON.parse (await file.readFile(userData.__file__, 'utf8'))

                const _user = _users.find(({ id }) => id === user.id)

                expect(_user).toBeDefined()

                expect(_user.id).toEqual(user.id)

                expect(_user).toMatchObject(data)

                expect(Object.keys(_user).length).toEqual(Object.keys(data).length + 1)
                    
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

        it('should succeed on matching existing users', async () => {
            const criteria = ({ name, email }) => (name.includes('F') || name.includes('a')) && email.includes('i')

            await userData.find(criteria)
            const x_users = await userData.find(criteria)
            const __users = _users.filter(criteria)

            expect(x_users).toEqual(__users)
        })
    })

    afterAll(() => file.writeFile(userData.__file__, '[]'))
})